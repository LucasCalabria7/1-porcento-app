"use client"

import * as React from "react"
import * as TabsPrimitive from "@radix-ui/react-tabs"

import { cn } from "@/lib/utils"

const Tabs = TabsPrimitive.Root

const TabsList = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.List
    ref={ref}
    className={cn(
      "flex w-full overflow-x-auto md:inline-flex h-12 items-center justify-start md:justify-center rounded-lg p-1 text-gray-300 bg-dark-800/50 border border-dark-600",
      className
    )}
    {...props}
  />
))
TabsList.displayName = TabsPrimitive.List.displayName

const TabsTrigger = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Trigger
    ref={ref}
    className={cn(
      "inline-flex items-center justify-center whitespace-nowrap rounded-lg px-4 py-2 text-sm font-medium transition-all duration-200",
      "hover:bg-dark-700 hover:text-white focus-visible:outline-none focus:outline-none",
      "disabled:pointer-events-none disabled:opacity-50",
      "data-[state=active]:bg-primary-900/30 data-[state=active]:text-primary-400 data-[state=active]:shadow-sm data-[state=active]:border-b-2 data-[state=active]:border-primary-500",
      "relative overflow-hidden group",
      className
    )}
    {...props}
  >
    <div className="relative z-10 flex items-center">
      {props.children}
    </div>
    <div className="absolute inset-0 bg-gradient-to-r from-primary-600/0 via-primary-600/0 to-primary-600/0 opacity-0 group-hover:opacity-10 group-data-[state=active]:from-primary-600/10 group-data-[state=active]:via-primary-600/5 group-data-[state=active]:to-primary-600/0 group-data-[state=active]:opacity-100 transition-opacity duration-300"></div>
  </TabsPrimitive.Trigger>
))
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName

const TabsContent = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Content
    ref={ref}
    className={cn(
      "mt-2 ring-offset-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2",
      className
    )}
    {...props}
  />
))
TabsContent.displayName = TabsPrimitive.Content.displayName

export { Tabs, TabsList, TabsTrigger, TabsContent }
