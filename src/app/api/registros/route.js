import { NextResponse } from "next/server";
import { conn } from '@/libs/mysql';

export async function GET() {
    try {
        const result = await conn.query('SELECT * FROM registro');    
        return NextResponse.json({message: result});
    } catch (error) {
        console.log(error)
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
export async function POST(request) {
    try {
        const {id, productId, nombre_u, email, description, price, pagado} = await request.json();
        const result = await conn.query('INSERT INTO registro SET ?', {
            id: id,
            productId: productId,
            nombre_u: nombre_u,
            email: email,
            description: description,
            price: price,
            pagado: pagado
        })
        console.log(result)
        return NextResponse.json({
            id,
            productId,
            nombre_u,
            email,
            description,
            price,
            pagado
        });
    } catch (error) {
        console.log(error)
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
