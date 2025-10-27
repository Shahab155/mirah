import pool from '../../../../../lib/db';
import { NextResponse } from 'next/server';

export async function GET(_, { params }) {
  try {
    const { slug } = params;

    // 1️⃣ Find collection ID from slug
    const [collection] = await pool.query(
      'SELECT id FROM collections WHERE slug = ? LIMIT 1',
      [slug]
    );

    if (collection.length === 0) {
      return NextResponse.json({ message: 'Collection not found' }, { status: 404 });
    }

    const collectionId = collection[0].id;

    // 2️⃣ Fetch products under that collection
    const [products] = await pool.query(
      `
      SELECT p.*, c.name AS category_name, col.name AS collection_name
      FROM products p
      LEFT JOIN categories c ON p.category_id = c.id
      LEFT JOIN collections col ON p.collection_id = col.id
      WHERE p.collection_id = ?
      ORDER BY p.created_at DESC
      `,
      [collectionId]
    );

    return NextResponse.json(products, { status: 200 });
  } catch (error) {
    console.error('Error fetching collection products:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
