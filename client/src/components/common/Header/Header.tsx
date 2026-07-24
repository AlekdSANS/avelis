import styles from "./Header.module.scss";
import { LogOut, Menu, Search, ShoppingBag, User, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";

import { IconButton } from "../../ui/IconButton/IconButton";
import { useCurrentUser, useLogout } from "../../../features/auth/hooks/useAuth";
import { usePresence } from "../../../hooks/usePresence";
import { Logo } from "../Logo/Logo";

type HeaderProps = {
  cartCount?: number;
  className?: string;
  onCartOpen: () => void;
  onSearchOpen: () => void;
};

const navigation = [
  { label: "Home", to: "/", end: true },
  { label: "Shop", to: "/shop", end: true },
  { label: "Collections", to: "/collections" },
  { label: "Fragrance Guide", to: "/fragrance-guide", end: true },
  { label: "About", to: "/about", end: true },
];

export function Header({
  cartCount = 0,
  className,
  onCartOpen,
  onSearchOpen,
}: HeaderProps) {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const isHome = pathname === "/";
  const { data: user, isLoading: isAuthLoading } = useCurrentUser();
  const logout = useLogout();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isClosing: isMenuClosing, isMounted: isMenuMounted } = usePresence(
    isMenuOpen,
  );
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 8);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (!isMenuOpen) {
      return;
    }

    const previousOverflow = document.body.style.overflow;

    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isMenuOpen]);

  const classes = [
    styles.header,
    isHome ? styles.homeHeader : "",
    isScrolled ? styles.scrolled : "",
    className ?? "",
  ]
    .filter(Boolean)
    .join(" ");

  const openSearch = () => {
    setIsMenuOpen(false);
    onSearchOpen();
  };

  const openCart = () => {
    setIsMenuOpen(false);
    onCartOpen();
  };

  const handleLogout = async () => {
    try {
      await logout.mutateAsync();
    } catch {
      return;
    }

    setIsMenuOpen(false);

    if (pathname.startsWith("/account") || pathname.startsWith("/admin")) {
      navigate("/login", { replace: true });
    }
  };

  const accountTarget = user === null || user === undefined ? "/login" : "/account";

  return (
    <header className={classes}>
      <div className={styles.inner}>
        <Logo />

        <nav aria-label="Primary navigation" className={styles.desktopNav}>
          {navigation.map((item) => (
            <NavLink
              className={({ isActive }) =>
                [
                  styles.navLink,
                  isActive ? styles.activeNavLink : "",
                ]
                  .filter(Boolean)
                  .join(" ")
              }
              end={item.end}
              key={item.to}
              to={item.to}
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className={styles.actions}>
          <IconButton aria-label="Open search" onClick={openSearch}>
            <Search />
          </IconButton>
          <Link
            aria-label={
              user === null || user === undefined
                ? "Sign in"
                : `Account for ${user.firstName}`
            }
            className={[styles.accountLink, styles.desktopAction].join(" ")}
            to={accountTarget}
          >
            <User />
            {user !== null && user !== undefined ? (
              <span className={styles.accountName}>{user.firstName}</span>
            ) : null}
          </Link>
          {user !== null && user !== undefined ? (
            <IconButton
              aria-label="Sign out"
              className={styles.desktopAction}
              disabled={logout.isPending}
              onClick={() => {
                void handleLogout();
              }}
            >
              <LogOut />
            </IconButton>
          ) : null}
          <IconButton aria-label="Open cart" onClick={openCart}>
            <ShoppingBag />
            <span aria-hidden="true" className={styles.badge}>
              {cartCount}
            </span>
          </IconButton>
          <IconButton
            aria-expanded={isMenuOpen}
            aria-label="Open navigation menu"
            className={styles.menuButton}
            onClick={() => setIsMenuOpen(true)}
          >
            <Menu />
          </IconButton>
        </div>
      </div>

      {isMenuMounted ? (
        <div
          className={[
            styles.mobileLayer,
            isMenuClosing ? styles.closing : "",
          ]
            .filter(Boolean)
            .join(" ")}
        >
          <button
            aria-label="Close navigation menu"
            className={styles.backdrop}
            onClick={() => setIsMenuOpen(false)}
            type="button"
          />
          <aside
            aria-label="Mobile navigation"
            className={styles.mobileDrawer}
          >
            <div className={styles.mobileHeader}>
              <Logo showDescriptor />
              <IconButton
                aria-label="Close navigation menu"
                onClick={() => setIsMenuOpen(false)}
                ref={closeButtonRef}
              >
                <X />
              </IconButton>
            </div>

            <nav aria-label="Mobile primary navigation" className={styles.mobileNav}>
              {navigation.map((item) => (
                <NavLink
                  className={({ isActive }) =>
                    [
                      styles.mobileNavLink,
                      isActive ? styles.activeMobileNavLink : "",
                    ]
                    .filter(Boolean)
                    .join(" ")
                  }
                  end={item.end}
                  key={item.to}
                  onClick={() => setIsMenuOpen(false)}
                  to={item.to}
                >
                  {item.label}
                </NavLink>
              ))}
            </nav>

            <div className={styles.mobileActions}>
              <button onClick={openSearch} type="button">
                Search fragrances
              </button>
              {isAuthLoading ? (
                <span className={styles.mobileAuthStatus}>Checking session</span>
              ) : user !== null && user !== undefined ? (
                <>
                  <Link onClick={() => setIsMenuOpen(false)} to="/account">
                    {user.firstName}'s account
                  </Link>
                  <button
                    disabled={logout.isPending}
                    onClick={() => {
                      void handleLogout();
                    }}
                    type="button"
                  >
                    Sign out
                  </button>
                </>
              ) : (
                <>
                  <Link onClick={() => setIsMenuOpen(false)} to="/login">
                    Sign in
                  </Link>
                  <Link onClick={() => setIsMenuOpen(false)} to="/register">
                    Create account
                  </Link>
                </>
              )}
            </div>
          </aside>
        </div>
      ) : null}
    </header>
  );
}
