import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";
import { connectToDatabase } from "@/helpers/server-helpers";
import prisma from "../../../../prisma";

export const POST = async (request: Request) => {
  try {
    const { name, username, email, password } = await request.json();
    if (!name || !username || !email || !password)
      return NextResponse.json({ message: "Invalid Data" }, { status: 422 });
    await connectToDatabase();
    const isEmailExist = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (isEmailExist)
      return NextResponse.json(
        { message: "Email is already in use" },
        { status: 400 },
      );

    const isUsernameExist = await prisma.user.findUnique({
      where: {
        username,
      },
    });

    if (isUsernameExist)
      return NextResponse.json(
        { message: "Username is already in use" },
        { status: 401 },
      );

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: { name, email, username, password: hashedPassword },
    });
    return NextResponse.json(
      { message: "user is registered", user },
      { status: 200 },
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "Server Error!" }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
};

// import User from "@/models/User";
// import connect from "@/utils/db";

// await connect();

// const isEmailExist = await User.findOne({ email });

// if (isEmailExist) {
//   return new NextResponse("Email is already in use", { status: 400 });
// }

// const isUsernameExist = await User.findOne({ username });

// if (isUsernameExist) {
//   return new NextResponse("Username is already in use", { status: 400 });
// }

// const hashedPassword = await bcrypt.hash(password, 5);
// const newUser = new User({
//   name,
//   email,
//   username,
//   password: hashedPassword,
// });

// try {
//   await newUser.save();
//   return new NextResponse("user is registered", { status: 200 });
// } catch (err: any) {
//   return new NextResponse(err, {
//     status: 500,
//   });
// }
