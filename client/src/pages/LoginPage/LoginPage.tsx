import styles from "./LoginPage.module.scss";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight, Eye, EyeOff, LockKeyhole } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { z } from "zod";

import { useLogin } from "../../features/auth/hooks/useAuth";
import { ApiClientError } from "../../services/apiClient";
import { Button } from "../../components/ui/Button/Button";
import { IconButton } from "../../components/ui/IconButton/IconButton";
import { Input } from "../../components/ui/Input/Input";
import { trackAuth } from "../../services/analytics";

const loginSchema = z.object({
	email: z.string().trim().email("Enter a valid email address."),
	password: z.string().min(8, "Password must be at least 8 characters."),
});

type LoginFormValues = z.infer<typeof loginSchema>;

const LOGIN_VISIT_KEY = "avelis:login-visited";

function hasVisitedLogin() {
	try {
		return window.localStorage.getItem(LOGIN_VISIT_KEY) === "true";
	} catch {
		return false;
	}
}

function getSafeRedirect(state: unknown) {
	if (
		typeof state === "object" &&
		state !== null &&
		"from" in state &&
		typeof state.from === "object" &&
		state.from !== null &&
		"pathname" in state.from &&
		typeof state.from.pathname === "string" &&
		state.from.pathname.startsWith("/") &&
		!state.from.pathname.startsWith("//")
	) {
		return state.from.pathname;
	}

	return "/account";
}

export function LoginPage() {
	const location = useLocation();
	const navigate = useNavigate();
	const login = useLogin();
	const [isReturningVisitor] = useState(hasVisitedLogin);
	const [serverError, setServerError] = useState<string | null>(null);
	const [showPassword, setShowPassword] = useState(false);
	const {
		formState: { errors },
		handleSubmit,
		register,
	} = useForm<LoginFormValues>({
		resolver: zodResolver(loginSchema),
		defaultValues: {
			email: "",
			password: "",
		},
	});
	const isSubmitting = login.isPending;

	useEffect(() => {
		try {
			window.localStorage.setItem(LOGIN_VISIT_KEY, "true");
		} catch {
			// Storage may be unavailable in privacy-restricted browser contexts.
		}
	}, []);

	const onSubmit = async (values: LoginFormValues) => {
		setServerError(null);

		try {
			const response = await login.mutateAsync(values);
			trackAuth("login", response.data.user.role);
			navigate(getSafeRedirect(location.state), { replace: true });
		} catch (error) {
			if (error instanceof ApiClientError) {
				setServerError(error.message);
				return;
			}

			setServerError("Unable to sign in right now.");
		}
	};

	return (
		<section className={styles.page}>
			<div className={styles.authColumn}>
				<div className={styles.panel}>
					<div className={styles.heading}>
						<p className={styles.eyebrow}>The Avelis atelier</p>
						<h1>
							{isReturningVisitor ? (
								<>
									Welcome
									<br />
									back.
								</>
							) : (
								<>Greetings.</>
							)}
						</h1>
						<p className={styles.intro}>
							Sign in to revisit your collection, orders, and saved discoveries.
						</p>
					</div>

					<form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
						<div className={styles.field}>
							<label htmlFor="email">Email address</label>
							<Input
								aria-describedby={errors.email ? "email-error" : undefined}
								aria-invalid={Boolean(errors.email)}
								autoComplete="email"
								className={styles.input}
								id="email"
								inputMode="email"
								placeholder="you@example.com"
								type="email"
								{...register("email")}
							/>
							{errors.email ? (
								<p className={styles.error} id="email-error">
									{errors.email.message}
								</p>
							) : null}
						</div>

						<div className={styles.field}>
							<div className={styles.labelRow}>
								<label htmlFor="password">Password</label>
								<span>8 characters minimum</span>
							</div>
							<div className={styles.passwordField}>
								<Input
									aria-describedby={errors.password ? "password-error" : undefined}
									aria-invalid={Boolean(errors.password)}
									autoComplete="current-password"
									className={styles.input}
									id="password"
									placeholder="Enter your password"
									type={showPassword ? "text" : "password"}
									{...register("password")}
								/>
								<IconButton
									aria-label={showPassword ? "Hide password" : "Show password"}
									className={styles.passwordToggle}
									onClick={() => setShowPassword((value) => !value)}
								>
									{showPassword ? <EyeOff /> : <Eye />}
								</IconButton>
							</div>
							{errors.password ? (
								<p className={styles.error} id="password-error">
									{errors.password.message}
								</p>
							) : null}
						</div>

						{serverError ? (
							<p className={styles.serverError} role="alert">
								{serverError}
							</p>
						) : null}

						<Button
							className={styles.submitButton}
							disabled={isSubmitting}
							fullWidth
							type="submit"
						>
							<span>{isSubmitting ? "Signing in" : "Enter your account"}</span>
							<ArrowRight aria-hidden="true" />
						</Button>
					</form>

					<div className={styles.assurance}>
						<LockKeyhole aria-hidden="true" />
						<span>Your details are protected and never shared.</span>
					</div>

					<p className={styles.switchText}>
						New to Avelis? <Link to="/register">Create an account</Link>
					</p>
				</div>
			</div>

			<aside
				aria-label="Avelis Noxwood fragrance campaign"
				className={styles.visual}
			>
				<img
					alt="Avelis Noxwood perfume among deep violet magnolia branches"
					className={styles.visualImage}
					src="/images/hero/home_hero_nox.png"
				/>
				<div className={styles.visualShade} />
				<div className={styles.visualFrame} aria-hidden="true" />
			</aside>
		</section>
	);
}
