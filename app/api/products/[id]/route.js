import { NextResponse } from 'next/server';
import pool from '../../../../lib/db'; // ✅ correct import (use default export)

export async function GET(_, { params }) {
  try {
    const [rows] = await pool.query('SELECT * FROM products WHERE id = ?', [params.id]);
    if (rows.length === 0) {
      return NextResponse.json({ message: 'Product not found' }, { status: 404 });
    }
    return NextResponse.json(rows[0], { status: 200 });
  } catch (error) {
    console.error('Error fetching product:', error);
    return NextResponse.json({ message: 'Database error', error }, { status: 500 });
  }
}

export async function PUT(req, { params }) {
  try {
    const form = await req.formData();
    const name = form.get('name');
    const description = form.get('description') || '';
    const price = parseFloat(form.get('price')) || 0;
    const category_id = form.get('category_id') || null;
    const collection_id = form.get('collection_id') || null;
    const image = form.get('image') || null;

    if (!name) {
      return NextResponse.json({ message: 'Name is required' }, { status: 400 });
    }

    const [result] = await pool.query(
      'UPDATE products SET name=?, description=?, price=?, category_id=?, collection_id=?, image=? WHERE id=?',
      [name, description, price, category_id, collection_id, image, params.id]
    );

    if (result.affectedRows === 0) {
      return NextResponse.json({ message: 'Product not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Product updated successfully' }, { status: 200 });
  } catch (error) {
    console.error('Error updating product:', error);
    return NextResponse.json({ message: 'Database error', error }, { status: 500 });
  }
}

export async function DELETE(_, { params }) {
  try {
    const [result] = await pool.query('DELETE FROM products WHERE id = ?', [params.id]);

    if (result.affectedRows === 0) {
      return NextResponse.json({ message: 'Product not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Product deleted successfully' }, { status: 200 });
  } catch (error) {
    console.error('Error deleting product:', error);
    return NextResponse.json({ message: 'Database error', error }, { status: 500 });
  }
}
