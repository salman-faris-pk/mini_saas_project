import { NextResponse } from 'next/server';
import User from '@/models/User';
import dbConnect from '@/lib/db';
import { Types } from 'mongoose';

interface RegisterRequest {
  username: string;
  email: string;
  password: string;
}

interface UserResponse {
  id: Types.ObjectId;
  username: string;
  email: string;
  emailVerified: boolean;
  credits:number;
}

export async function POST(request: Request) {
  try {
    await dbConnect();
    
    const { username, email, password }: RegisterRequest = await request.json();

    if (!username || !email || !password) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      );
    }

    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
      return NextResponse.json(
        { error: 'Email already in use' },
        { status: 409 }
      );
    }

    const existingUsername = await User.findOne({ username });
    if (existingUsername) {
      return NextResponse.json(
        { error: 'Username already taken' },
        { status: 409 }
      );
    }

    const newUser = new User({
      username,
      email,
      password
    });

    await newUser.save();

    const responseUser: UserResponse = {
      id: newUser._id,
      username: newUser.username,
      email: newUser.email,
      emailVerified: newUser.emailVerified,
      credits:newUser.credits
    };

    return NextResponse.json(
      { 
        success: true,
        message: 'Registration successful',
        user: responseUser
      },
      { status: 201 }
    );

  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export const dynamic = 'force-dynamic'; // Prevent satic datas when builds