import clientPromise from '@/lib/mongodb';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db('mydb'); // Nazwa bazy danych
    
    // Przykład: pobranie wszystkich dokumentów z kolekcji 'users'
    const users = await db.collection('users').find({}).toArray();
    
    return NextResponse.json({ 
      success: true, 
      data: users,
      message: 'Połączenie z MongoDB działa!' 
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const client = await clientPromise;
    const db = client.db('mydb');
    
    const body = await request.json();
    
    // Przykład: dodanie nowego użytkownika
    const result = await db.collection('users').insertOne(body);
    
    return NextResponse.json({ 
      success: true, 
      data: result,
      message: 'Dokument dodany!' 
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
