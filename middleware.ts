import { NextResponse, type NextRequest } from 'next/server';
import { createServerClient } from '@supabase/ssr';
const protectedPrefixes=['/candidate','/recruiter','/agency','/school','/messages','/settings'];
export async function middleware(request:NextRequest){let response=NextResponse.next({request});const supabase=createServerClient(process.env.NEXT_PUBLIC_SUPABASE_URL!,process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,{cookies:{getAll:()=>request.cookies.getAll(),setAll:(cs)=>{cs.forEach(c=>request.cookies.set(c.name,c.value));response=NextResponse.next({request});cs.forEach(c=>response.cookies.set(c.name,c.value,c.options));}}});const {data:{user}}=await supabase.auth.getUser();if(protectedPrefixes.some(p=>request.nextUrl.pathname.startsWith(p))&&!user){return NextResponse.redirect(new URL('/auth/login',request.url))}return response}
export const config={matcher:['/((?!_next/static|_next/image|favicon.ico).*)']};
