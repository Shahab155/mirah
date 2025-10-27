// /app/api/products/route.js
import pool from '../../../lib/db';
import fs from 'fs/promises';
import path from 'path';

const UPLOAD_DIR = path.join(process.cwd(), 'public', 'uploads');

async function saveFile(file) {
  // file is a File object from Request.formData()
  const filename = `${Date.now()}-${file.name.replace(/\s+/g, '-')}`;
  const buffer = Buffer.from(await file.arrayBuffer());
  await fs.mkdir(UPLOAD_DIR, { recursive: true });
  const filePath = path.join(UPLOAD_DIR, filename);
  await fs.writeFile(filePath, buffer);
  return `/uploads/${filename}`; // relative URL
}

export async function GET(req) {
  const url = new URL(req.url);
  const id = url.searchParams.get('id');
  if (id) {
    const [rows] = await pool.query('SELECT * FROM products WHERE id=?', [id]);
    return new Response(JSON.stringify(rows[0] || null), { status: 200 });
  } else {
    // list with joins for category/collection names
    const [rows] = await pool.query(`
      SELECT p.*, c.name as category_name, col.name as collection_name
      FROM products p
      LEFT JOIN categories c ON p.category_id = c.id
      LEFT JOIN collections col ON p.collection_id = col.id
      ORDER BY p.created_at DESC
    `);
    return new Response(JSON.stringify(rows), { status: 200 });
  }
}

export async function POST(req) {
  const form = await req.formData();
  const name = form.get('name');
  const description = form.get('description') || '';
  const price = parseFloat(form.get('price') || '0');
  const category_id = form.get('category_id') || null;
  const collection_id = form.get('collection_id') || null;
  let image_url = null;

  const file = form.get('image');
  if (file && file.size && file.name) {
    image_url = await saveFile(file);
  }

  const [result] = await pool.query(
    'INSERT INTO products (name, description, image_url, price, category_id, collection_id) VALUES (?,?,?,?,?,?)',
    [name, description, image_url, price, category_id || null, collection_id || null]
  );

  const [row] = await pool.query('SELECT * FROM products WHERE id=?', [result.insertId]);
  return new Response(JSON.stringify(row[0]), { status: 201 });
}

export async function PUT(req) {
  const form = await req.formData();
  const id = form.get('id');
  const name = form.get('name');
  const description = form.get('description') || '';
  const price = parseFloat(form.get('price') || '0');
  const category_id = form.get('category_id') || null;
  const collection_id = form.get('collection_id') || null;

  let image_url = null;
  const file = form.get('image');
  if (file && file.size && file.name) {
    image_url = await saveFile(file);
    await pool.query(
      'UPDATE products SET name=?, description=?, image_url=?, price=?, category_id=?, collection_id=? WHERE id=?',
      [name, description, image_url, price, category_id || null, collection_id || null, id]
    );
  } else {
    await pool.query(
      'UPDATE products SET name=?, description=?, price=?, category_id=?, collection_id=? WHERE id=?',
      [name, description, price, category_id || null, collection_id || null, id]
    );
  }

  return new Response(JSON.stringify({ ok: true }), { status: 200 });
}

export async function DELETE(req) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id');
  await pool.query('DELETE FROM products WHERE id=?', [id]);
  return new Response(JSON.stringify({ ok: true }), { status: 200 });
}
