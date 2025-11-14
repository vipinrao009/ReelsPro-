// import ImageKit from "imagekit";
// import { NextResponse } from "next/server";

// const imagekit = new ImageKit({
//   privateKey: process.env.IMAGEKIT_PRIVATE_KEY!,
//   publicKey: process.env.IMAGEKIT_PUBLIC_KEY!,
//   urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT!,
// });

// export async function GET() {
//   try {
//     const authenticationParameter = imagekit.getAuthenticationParameters();
//     return NextResponse.json(authenticationParameter);
//   } catch (error) {
//     return NextResponse.json(
//       { error: "Imagekit auth failed" },
//       { status: 500 }
//     );
//   }
// }


import { getUploadAuthParams } from "@imagekit/next/server";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const auth = getUploadAuthParams({
      privateKey: process.env.IMAGEKIT_PRIVATE_KEY!,
      publicKey: process.env.IMAGEKIT_PUBLIC_KEY!,
    });

    return NextResponse.json(auth);
  } catch (error) {
    console.error("ImageKit auth error:", error);
    return NextResponse.json(
      { error: "ImageKit auth failed" },
      { status: 500 }
    );
  }
}

