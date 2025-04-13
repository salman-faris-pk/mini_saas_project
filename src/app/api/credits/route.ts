import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../../lib/auth';
import dbconnect from '../../../lib/db';
import User from '@/models/User'; 
import { revalidateTag } from 'next/cache';

export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    await dbconnect();

    const user = await User.findById(session.user.id).select('credits plan');

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    return NextResponse.json({ credits: user.credits ,plan: user.plan}, { status: 200 });

  } catch (error) {
    console.error('Error fetching credits:', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}

export async function POST() {
  revalidateTag('credits');
  return NextResponse.json({ success: true });
}
