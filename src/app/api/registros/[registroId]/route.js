import { NextResponse } from "next/server";
import { conn } from '@/libs/mysql';

export async function GET(request, { params }) {
    try {
        const result = await conn.query('SELECT * FROM registro WHERE ID =?', [
            params.registroId,
        ]);

        if(result.length === 0){
            return NextResponse.json(
                {
                    message: "Producto no encontrado",
                },
                {
                    status: 404,
                }
            );
        }

        return NextResponse.json({message: result[0]});
    } catch (error) {
        return NextResponse.json(
            {
                message: error.message,
            },
            {
                status: 500,
            }
        )
    }
}
export async function DELETE(request, { params }) {
    const result = await conn.query('DELETE FROM registro WHERE ID =?', [
        params.registroId,
    ]);

    if(result.affectedRows === 0){
        return NextResponse.json(
            {
                message: "Producto no encontrado",
            },
            {
                status: 404,
            }
        );
    }
    return new Response(null, {
        status: 204,
        statusText: "Producto eliminado"
    });
}

export async function PUT(request, { params }){
    const data = await request.json();
    
    const result = await conn.query('UPDATE registro SET ? WHERE ID =?', [ data,
        params.registroId
    ]);

    if(result.affectedRows === 0){
        return NextResponse.json(
            {
                message: "Producto no encontrado",
            },
            {
                status: 404,
            }
        );
    }

    console.log(result);
    return NextResponse.json({
        ...data,
    })
}