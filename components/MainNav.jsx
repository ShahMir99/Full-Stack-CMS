"use client"

import { cn } from "@/lib/utils"
import Link from "next/link"
import { useParams, usePathname } from "next/navigation"

const MainNav = ({
  className
}) => {

    const pathName = usePathname()
    const params = useParams()

    const routes = [
      {
        href : `/${params.storeId}`,
        label : "Dashboard",
        active : pathName === `/${params.storeId}`
      },
      {
        href : `/${params.storeId}/signboards`,
        label : "Signboards",
        active : pathName === `/${params.storeId}/signboards`
      },
      {
        href : `/${params.storeId}/products`,
        label : "Products",
        active : pathName === `/${params.storeId}/products`
      },
      {
        href : `/${params.storeId}/categories`,
        label : "Categories",
        active : pathName === `/${params.storeId}/categories`
      },
      {
        href : `/${params.storeId}/sizes`,
        label : "Sizes",
        active : pathName === `/${params.storeId}/sizes`
      },
      {
        href : `/${params.storeId}/colors`,
        label : "Colors",
        active : pathName === `/${params.storeId}/colors`
      },
      {
        href : `/${params.storeId}/settings`,
        label : "Settings",
        active : pathName === `/${params.storeId}/settings`
      },
    ]

  return (
    <nav className={cn("pt-1 flex items-center space-x-4 lg:space-x-6", className)}>
        {
          routes?.map((route) => (
            <Link
            key={route.href}
            href={route.href}
            className={cn(
              "text-sm font-medium transition-colors hover:text-[#696cff]",
              route.active
              ? "text-[#696cff]"
              : "text-[#646464]"
            )}
            >
              {route.label}
            </Link>
          ))
        }
    </nav>
  )
}

export default MainNav