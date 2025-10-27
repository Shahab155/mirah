import pool from '../../../../../lib/db';
import { NextResponse } from 'next/server';

export async function GET(_, { params }) {
  try {
    const { slug } = params;

    // 1️⃣ Find category ID from slug
    const [category] = await pool.query(
      'SELECT id FROM categories WHERE slug = ? LIMIT 1',
      [slug]
    );

    if (category.length === 0) {
      return NextResponse.json({ message: 'Category not found' }, { status: 404 });
    }

    const categoryId = category[0].id;

    // 2️⃣ Fetch products under that category
    const [products] = await pool.query(
      `
      SELECT p.*, c.name AS category_name, col.name AS collection_name
      FROM products p
      LEFT JOIN categories c ON p.category_id = c.id
      LEFT JOIN collections col ON p.collection_id = col.id
      WHERE p.category_id = ?
      ORDER BY p.created_at DESC
      `,
      [categoryId]
    );

    return NextResponse.json(products, { status: 200 });
  } catch (error) {
    console.error('Error fetching category products:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
