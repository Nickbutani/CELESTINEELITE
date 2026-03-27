"use client";

import { useEffect, useState } from "react";
import {
  Avatar,
  Dropdown,
  DropdownDivider,
  DropdownHeader,
  DropdownItem,
  Navbar,
  NavbarBrand,
  NavbarCollapse,
  NavbarLink,
  NavbarToggle,
  Button,
} from "flowbite-react";


export function MainNavbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    window.location.href = "/";
  };

  return (
    <Navbar fluid rounded className="sticky top-0 z-50 shadow-sm">
      <NavbarBrand>
        <span className="text-xl font-semibold dark:text-white">
          CELESTINEELITE
        </span>
      </NavbarBrand>

      <div className="flex md:order-2 gap-2">
        {isLoggedIn ? (
          <Dropdown
            arrowIcon={false}
            inline
            label={
              <Avatar
                alt="User"
                img="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
                rounded
              />
            }
          >
            <DropdownHeader>
              <span className="block text-sm">User</span>
              <span className="block truncate text-sm font-medium">
                logged@user.com
              </span>
            </DropdownHeader>
            <DropdownItem>Dashboard</DropdownItem>
            <DropdownItem>Settings</DropdownItem>
            <DropdownDivider />
            <DropdownItem onClick={handleLogout}>Sign out</DropdownItem>
          </Dropdown>
        ) : (
          <>
            <Button size="sm" as="a" href="/login" color="light">
              Login
            </Button>
            <Button size="sm" as="a"  href="/signup" color ="dark">
              Sign Up
            </Button>
          </>
        )}
        <NavbarToggle />
      </div>

      <NavbarCollapse>
        <NavbarLink href="#" active>Home</NavbarLink>
        <NavbarLink href="#">About</NavbarLink>
        <NavbarLink href="#">Services</NavbarLink>
      </NavbarCollapse>
    </Navbar>
  );
}