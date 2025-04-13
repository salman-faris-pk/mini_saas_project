import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import User from '@/models/User';
import dbconnect from '@/lib/db';

type Image = {
    url: string;
    prompt: string;
    createdAt: Date | number | string; 
  };

export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    await dbconnect();

    const user = await User.findById(session.user.id);
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    const imageCount = user.images.length;
    const recentImages: Image[] = user.images
       .sort((a: any, b: any) => b.createdAt - a.createdAt)
       .slice(0, 9)
       .map((image: Image) => ({
       url: image.url,
       prompt: image.prompt,
      createdAt: image.createdAt
     }));

    return NextResponse.json({
      count: imageCount,
      recentImages
    });

  } catch (error) {
    console.error('Error fetching user images:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
    const session = await getServerSession(authOptions);
  
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
  
    try {
      await dbconnect();
      
      const { imageUrl } = await request.json();
      
      if (!imageUrl) {
        return NextResponse.json(
          { error: 'Image URL is required' },
          { status: 400 }
        );
      }
  
      const user = await User.findById(session.user.id);
      if (!user) {
        return NextResponse.json({ error: 'User not found' }, { status: 404 });
      }
  
      // Remove the image from the user's images array
      user.images = user.images.filter((img: any) => img.url !== imageUrl);
      await user.save();
  
      return NextResponse.json(
        { message: 'Image deleted successfully' },
        { status: 200 }
      );
  
    } catch (error) {
      console.error('Error deleting image:', error);
      return NextResponse.json(
        { error: 'Internal server error' },
        { status: 500 }
      );
    }
  }