import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import dbconnect from '@/lib/db';
import User  from '@/models/User';


export async function POST(req:Request) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    await dbconnect();
    const user = await User.findById(session.user.id);
    
    if (!user) {
      return Response.json({ error: 'User not found' }, { status: 404 });
    }

    if (user.credits < 1) {
      return Response.json({ error: 'Insufficient credits' }, { status: 403 });
    }

    const { prompt } = await req.json();
    
    if (!prompt?.trim()) {
      return Response.json({ error: 'Prompt is required' }, { status: 400 });
    }

    // First check if the model is ready
    const modelStatus = await fetch(
      'https://api-inference.huggingface.co/models/ZB-Tech/Text-to-Image',
      {
        headers: {
          'Authorization': `Bearer ${process.env.HUGGINGFACE_API_KEY}`,
        },
      }
    );

    if (!modelStatus.ok) {
      const statusText = await modelStatus.text();
      console.error('Model status check failed:', statusText);
      return Response.json(
        { error: 'Image generation service is currently unavailable. Please try again later.' },
        { status: 503 }
      );
    }

    // Then make the actual request
    const response = await fetch(
      'https://api-inference.huggingface.co/models/ZB-Tech/Text-to-Image',
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${process.env.HUGGINGFACE_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          inputs: prompt,
          parameters: { num_images: 1 }
        }),
      }
    );

    const contentType = response.headers.get('content-type');
    if (contentType?.includes('text/html')) {
      const htmlResponse = await response.text();
      console.error('Service unavailable response:', htmlResponse);
      return Response.json(
        { error: 'Image generation service is currently unavailable. Please try again later.' },
        { status: 503 }
      );
    }

    if (!response.ok) {
      try {
        const error = await response.json();
        throw new Error(error.message || 'Failed to generate image');
      } catch (e) {
        throw new Error(response.statusText || 'Failed to generate image');
      }
    }

    const imageBuffer = await response.arrayBuffer();
    const base64Image = Buffer.from(imageBuffer).toString('base64');
    const imageUrl = `data:image/png;base64,${base64Image}`;

    const imageData = {
      url: imageUrl,
      prompt: prompt,
    };

    user.credits -= 1;
    user.images = user.images || [];
    user.images.push(imageData);
    await user.save();

    return Response.json({ 
      imageUrl,
      message: 'Image generated and saved successfully'
    });

  } catch (error:any) {
    console.error('Image generation error:', error);
    return Response.json(
      { error: error.message || 'Image generation failed' },
      { status: 500 }
    );
  }
}