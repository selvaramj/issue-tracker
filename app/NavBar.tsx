"use client";
import {
  Avatar,
  Box,
  Container,
  DropdownMenu,
  Flex,
  Separator,
  Text,
} from "@radix-ui/themes";
import classnames from "classnames";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AiFillBug } from "react-icons/ai";
import { Skeleton } from "@/app/Components";

const NavBar = () => {
  const { status, data: sessionData } = useSession();

  console.log("session ", sessionData);

  return (
    <nav className=" h-14 border-b-2 px-5 mb-5 py-3">
      <Container>
        <Flex justify="between" align="center">
          <Flex align="center" gap="2">
            <Link href="/">
              <AiFillBug />
            </Link>
            <NavLinks />
          </Flex>
          <AuthStatus />
        </Flex>
      </Container>
    </nav>
  );
};

const AuthStatus = () => {
  const { status, data: sessionData } = useSession();

  if (status === "loading") return <Skeleton width="3rem" />;
  if (status === "unauthenticated")
    return (
      <Link href="/api/auth/signin" className="nav-links">
        {" "}
        Login
      </Link>
    );
  return (
    <Box>
      {status === "authenticated" && (
        <DropdownMenu.Root>
          <DropdownMenu.Trigger>
            <Avatar
              src={sessionData!.user!.image!}
              fallback="?"
              size="2"
              radius="full"
              className="cursor-pointer"
              referrerPolicy="no-referrer"
            />
          </DropdownMenu.Trigger>
          <DropdownMenu.Content>
            <DropdownMenu.Label>
              <Flex direction="column" gap="2" className="my-2" align="center">
                <Text color="mint">{sessionData.user!.email}</Text>
                <Separator className="mx-1" size="4" />
              </Flex>
            </DropdownMenu.Label>
            <DropdownMenu.Item>
              <Link href="/api/auth/signout">Sign out</Link>
            </DropdownMenu.Item>
          </DropdownMenu.Content>
        </DropdownMenu.Root>
      )}
    </Box>
  );
};

const NavLinks = () => {
  const currentPath = usePathname();
  const links = [
    { lable: "Dashboard", href: "/" },
    { lable: "Issues", href: "/issues/list" },
  ];

  return (
    <ul className="flex gap-2">
      {links.map((link) => (
        <li key={link.lable}>
          <Link
            href={link.href}
            className={classnames("nav-links", {
              "text-zinc-900 border-b-2 border-b-zinc-900":
                currentPath === link.href,
            })}
          >
            {link.lable}
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default NavBar;
