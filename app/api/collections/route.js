import { NextResponse } from 'next/server';
import pool from '../../../lib/db';

export async function GET() {
  try {
    const [rows] = await pool.query('SELECT * FROM collections ORDER BY id DESC');
    return NextResponse.json(rows, { status: 200 });
  } catch (error) {
    console.error('Error fetching collections:', error);
    return NextResponse.json({ error: 'Failed to fetch collections' }, { status: 500 });
  }
}


// ==================== POST (Add a new collection)
export async function POST(req) {
  try {
    const { name, slug } = await req.json();

    if (!name || !slug) {
      return NextResponse.json(
        { success: false, message: 'Name and slug are required' },
        { status: 400 }
      );
    }

    await pool.query('INSERT INTO collections (name, slug) VALUES (?, ?)', [name, slug]);

    return NextResponse.json(
      { success: true, message: 'Collection added successfully' },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error adding collection:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to add collection' },
      { status: 500 }
    );
  }
}

// ==================== PUT (Update a collection)
export async function PUT(req) {
  try {
    const { id, name, slug } = await req.json();

    if (!id || !name || !slug) {
      return NextResponse.json(
        { success: false, message: 'ID, name, and slug are required' },
        { status: 400 }
      );
    }

    const [result] = await pool.query(
      'UPDATE collections SET name = ?, slug = ? WHERE id = ?',
      [name, slug, id]
    );

    if (result.affectedRows === 0) {
      return NextResponse.json(
        { success: false, message: 'Collection not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: true, message: 'Collection updated successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error updating collection:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to update collection' },
      { status: 500 }
    );
  }
}

// ==================== DELETE (Remove a collection)
export async function DELETE(req) {
  try {
    const { id } = await req.json();

    if (!id) {
      return NextResponse.json(
        { success: false, message: 'Collection ID is required' },
        { status: 400 }
      );
    }

    const [result] = await pool.query('DELETE FROM collections WHERE id = ?', [id]);

    if (result.affectedRows === 0) {
      return NextResponse.json(
        { success: false, message: 'Collection not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: true, message: 'Collection deleted successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error deleting collection:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to delete collection' },
      { status: 500 }
    );
  }
}
