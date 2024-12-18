"use client";
import { ClerkProvider, useAuth } from "@clerk/nextjs";
import { ConvexProviderWithClerk } from "convex/react-clerk";
import { ConvexReactClient, AuthLoading, Authenticated } from "convex/react";
import Loading from "@/components/auth/loading";
import { Toaster } from "@/components/ui/sonner";

const convexUrl = process.env.NEXT_PUBLIC_CONVEX_URL as string;

const convexClient = new ConvexReactClient(convexUrl);
export default function ConvexClientProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider
      publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY as string}
    >
      <ConvexProviderWithClerk client={convexClient} useAuth={useAuth}>
        <Authenticated>
          <Toaster />
          {children}
        </Authenticated>
        <AuthLoading>
          <Loading />
        </AuthLoading>
      </ConvexProviderWithClerk>
    </ClerkProvider>
  );
}
