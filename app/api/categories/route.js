// /app/api/categories/route.js
import pool from '../../../lib/db';

export async function GET(req) {
  const [rows] = await pool.query('SELECT * FROM categories ORDER BY created_at DESC');
  return new Response(JSON.stringify(rows), { status: 200 });
}

export async function POST(req) {
  const body = await req.json(); // { name, slug }
  const { name, slug } = body;
  const [result] = await pool.query('INSERT INTO categories (name, slug) VALUES (?, ?)', [name, slug]);
  const [row] = await pool.query('SELECT * FROM categories WHERE id = ?', [result.insertId]);
  return new Response(JSON.stringify(row[0]), { status: 201 });
}

export async function PUT(req) {
  const body = await req.json(); // { id, name, slug }
  const { id, name, slug } = body;
  await pool.query('UPDATE categories SET name=?, slug=? WHERE id=?', [name, slug, id]);
  return new Response(JSON.stringify({ ok: true }), { status: 200 });
}

export async function DELETE(req) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id');
  await pool.query('DELETE FROM categories WHERE id=?', [id]);
  return new Response(JSON.stringify({ ok: true }), { status: 200 });
}
