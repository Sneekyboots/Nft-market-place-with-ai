"use client";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn, signOut, useSession } from "next-auth/react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
import {
  Sheet,
  // SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Form,
  FormControl,
  // FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import Brand from "@/components/Brand/Brand";
import "./SignIn.css";
import { Separator } from "@/components/ui/separator";

const formSchema = z.object({
  // username: z
  //   .string()
  //   .min(2, {
  //     message: "Username must be at least 2 characters.",
  //   })
  //   .max(20, {
  //     message: "Username must be at most 20 characters.",
  //   }),
  email: z.string().regex(/^\S+@\S+$/i, {
    message: "Email must be valid.",
  }),
  password: z
    .string()
    .min(8, {
      message: "Password must be at least 8 characters.",
    })
    .max(20, {
      message: "Password must be at most 30 characters.",
    }),
});

const SignIn = () => {
  const router = useRouter();

  const { data: session, status } = useSession();
  console.log(session, status);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    if (Object.keys(form.formState.errors).length === 0) {
      const res = await signIn("credentials", {
        redirect: false,
        email: values.email,
        password: values.password,
      });

      console.log("Sign In response : ", res);

      if (res?.error) {
        console.log("Invalid email or password");
      } else if (res?.url) {
        form.reset();
        console.log("Sign In Successfull!");
        router.replace("/market");
      }
    }
  }

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant="outline"
          type="button"
          name="sign_in"
          className="bg-transparent border-primary"
        >
          SIGN IN
        </Button>
      </SheetTrigger>
      <SheetContent className="flex flex-col gap-10">
        <SheetHeader>
          <SheetTitle>SIGN IN</SheetTitle>
          <SheetDescription>{`Let's follow the trend.`}</SheetDescription>
        </SheetHeader>
        <div className="flex flex-col justify-between relative flex-auto gap-10">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              {/* <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input placeholder="Type your username" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              /> */}
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Please provide a valid email Id."
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input placeholder="Password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <SheetFooter>
                {/* <SheetClose asChild> */}
                <Button type="submit">Sign In</Button>
                {/* </SheetClose> */}
              </SheetFooter>
              {/* <Button type="submit">Submit</Button> */}
            </form>
          </Form>
          <Separator />
          <SheetFooter className="flex !flex-col flex-auto !justify-between">
            <div className="flex flex-col gap-5">
              <Button type="button" onClick={() => signIn("github")}>
                Sign in with GitHub
              </Button>
              <Button type="button" onClick={() => signIn("google")}>
                Sign in with Google
              </Button>
            </div>

            <div className="flex">
              <Button
                className="flex-1"
                type="button"
                onClick={() => signOut()}
              >
                Sign out
              </Button>
              <Brand />
            </div>
          </SheetFooter>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default SignIn;

/* <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input id="name" value="Pedro Duarte" className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right">
              Username
            </Label>
            <Input id="username" value="@peduarte" className="col-span-3" />
          </div>
        </div> */
/* <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="shadcn" {...field} />
              </FormControl>
              <FormDescription>
                This is your public display name.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        /> */
/* <SheetFooter>
          <SheetClose asChild>
            <Button type="submit">Save changes</Button>
          </SheetClose>
        </SheetFooter> */
