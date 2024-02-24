"use client";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
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
import "./SignUp.css";

const formSchema = z.object({
  name: z
    .string()
    .min(2, {
      message: "Name must be at least 2 characters.",
    })
    .max(20, {
      message: "Name must be at most 20 characters.",
    }),
  username: z
    .string()
    .min(2, {
      message: "Username must be at least 2 characters.",
    })
    .max(20, {
      message: "Username must be at most 20 characters.",
    }),
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

const SignUp = () => {
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      username: "",
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    if (Object.keys(form.formState.errors).length === 0) {
      try {
        const res = await fetch("/api/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: values.name,
            email: values.email,
            username: values.username,
            password: values.password,
          }),
        });

        console.log("Sign Up response : ", res);

        if (res.status === 400) {
          console.log("This email is already registered");
          // setError("This email is already registered");
        } else if (res.status === 200) {
          // setError("");
          form.reset();
          router.push("/market");
        } else {
          console.log("Something went wrong!");
        }
      } catch (error) {
        // setError("Error, try again");
        console.log("Sign Up error : ", error);
      }
    } else {
      console.log("Please validate the form");
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
          SIGN UP
        </Button>
      </SheetTrigger>
      <SheetContent className="flex flex-col gap-10">
        <SheetHeader>
          <SheetTitle>SIGN UP</SheetTitle>
          <SheetDescription>{`Let's follow the trend.`}</SheetDescription>
        </SheetHeader>
        <div className="flex flex-col justify-between relative flex-auto">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Type your name" {...field} />
                    </FormControl>
                    {/* <FormDescription>Your public display name.</FormDescription> */}
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input placeholder="Type your username" {...field} />
                    </FormControl>
                    {/* <FormDescription>Your public display name.</FormDescription> */}
                    <FormMessage />
                  </FormItem>
                )}
              />
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
                <Button type="submit">Sign Up</Button>
                {/* </SheetClose> */}
              </SheetFooter>
              {/* <Button type="submit">Submit</Button> */}
            </form>
          </Form>
          <SheetFooter className="flex-auto items-end">
            <Brand />
          </SheetFooter>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default SignUp;
