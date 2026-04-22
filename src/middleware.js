
import { getToken } from 'next-auth/jwt';
import { NextResponse } from 'next/server'

const adminPaths = ['/Dashboard/manage-users', '/Dashboard/ManageUsers', '/Dashboard/ManageProject']
const buyerPaths = ['/Dashboard/add-task', '/Dashboard/CreateProject', '/Dashboard/Project-list']
const workerPaths = ['/Dashboard/tasks', '/Dashboard/My-Requsts', '', '/Dashboard/Profile']

export async function middleware(req) {
  const path = req.nextUrl.pathname;
  
  
  const token = await getToken({ 
    req, 
    secret: process.env.NEXTAUTH_SECRET
  });
 
//   This login not found and then its is
  if (!token) {
    return NextResponse.redirect(new URL("/Login", req.url));
  }

  const role = token?.role;

  // ৩. Admin 
  if (adminPaths.includes(path) && role !== 'Admin') {
    return NextResponse.redirect(new URL("/unauthorized", req.url));
  }

  // ৪. Worker 
  if (workerPaths.includes(path) && role !== 'Worker') {
    return NextResponse.redirect(new URL("/unauthorized", req.url));
  }

  // ৫. Buyer 
  if (buyerPaths.includes(path) && role !== 'Buyer') {
    return NextResponse.redirect(new URL("/unauthorized", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/Dashboard/:path*"],
};