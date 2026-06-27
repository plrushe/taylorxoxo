import { cookies } from 'next/headers';
import { createServerClient } from '@supabase/ssr';
export async function createSupabaseServer(){const cookieStore=await cookies();return createServerClient(process.env.NEXT_PUBLIC_SUPABASE_URL!,process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,{cookies:{getAll(){return cookieStore.getAll()},setAll(cookiesToSet){cookiesToSet.forEach(({name,value,options})=>cookieStore.set(name,value,options))}}})}
export async function getSessionProfile(){const supabase=await createSupabaseServer();const {data:{user}}=await supabase.auth.getUser();if(!user)return {supabase,user:null,profile:null};const {data:profile}=await supabase.from('profiles').select('*').eq('id',user.id).maybeSingle();return{supabase,user,profile}}
