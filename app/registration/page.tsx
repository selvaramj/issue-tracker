"use client";
import { Box, Button, Card, Flex, Heading, TextField } from "@radix-ui/themes";
import React, { useState } from "react";
import { Form, useForm } from "react-hook-form";
import { z } from "zod";
import { userRegistrationSchema } from "../validationSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useRouter } from "next/navigation";

type RegFormData = z.infer<typeof userRegistrationSchema>;
const RegistrationPage = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const { register, formState, handleSubmit, reset } = useForm<RegFormData>({
    resolver: zodResolver(userRegistrationSchema),
  });

  const onSubmitHandler = handleSubmit(async (data: RegFormData) => {
    try {
      setIsLoading(true);
      let reponse = await axios.post<RegFormData>("/api/users", data);
      if (reponse.status) {
        console.log("Registration successful");
      }
      router.push("/");
    } catch (error) {
      console.log("The Error ", error);
    } finally {
      setIsLoading(false);
    }
  });
  return (
    <Flex align="center" justify="center">
      <Card className="max-w-3xl">
        <form onSubmit={onSubmitHandler} onReset={() => reset()}>
          <Flex direction="column" gap="2">
            <Heading as="h3" align="center">
              Registration Form
            </Heading>
            <div>
              <label htmlFor="name">Name</label>
              <Box maxWidth="450px" minWidth="300px">
                <TextField.Root
                  placeholder="Enter your name"
                  type="text"
                  id="name"
                  {...register("name")}
                />
              </Box>
            </div>
            <div>
              <label htmlFor="email">Email</label>
              <Box maxWidth="450px" minWidth="300px">
                <TextField.Root
                  placeholder="Enter your email address"
                  type="email"
                  id="email"
                  {...register("email")}
                />
              </Box>
            </div>
            <div>
              <label htmlFor="password">Password</label>
              <Box maxWidth="450px" minWidth="300px">
                <TextField.Root
                  placeholder="**********"
                  type="password"
                  id="password"
                  {...register("password")}
                />
              </Box>
            </div>
            <Flex justify="between">
              <Button type="reset" disabled={false}>
                Reset
              </Button>
              <Button type="submit" disabled={false}>
                Submit
              </Button>
            </Flex>
          </Flex>
        </form>
      </Card>
    </Flex>
  );
};

export default RegistrationPage;
