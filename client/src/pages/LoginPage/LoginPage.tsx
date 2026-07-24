import styles from "./LoginPage.module.scss";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff, LogIn } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { z } from "zod";

import { useLogin } from "../../features/auth/hooks/useAuth";
import { ApiClientError } from "../../services/apiClient";
import { Button } from "../../components/ui/Button/Button";
import { IconButton } from "../../components/ui/IconButton/IconButton";
import { Input } from "../../components/ui/Input/Input";

const loginSchema = z.object({
	email: z.string().trim().email("Enter a valid email address."),
	password: z.string().min(8, "Password must be at least 8 characters."),
});

type LoginFormValues = z.infer<typeof loginSchema>;

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

	const onSubmit = async (values: LoginFormValues) => {
		setServerError(null);

		try {
			await login.mutateAsync(values);
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
			<div className={styles.panel}>
				<div className={styles.heading}>
					<p>Welcome back</p>
					<h1>Sign in to AVELIS</h1>
				</div>

				<form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
					<div className={styles.field}>
						<label htmlFor="email">Email</label>
						<Input
							autoComplete="email"
							id="email"
							inputMode="email"
							type="email"
							{...register("email")}
						/>
						{errors.email ? (
							<p className={styles.error}>{errors.email.message}</p>
						) : null}
					</div>

					<div className={styles.field}>
						<label htmlFor="password">Password</label>
						<div className={styles.passwordField}>
							<Input
								autoComplete="current-password"
								id="password"
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
							<p className={styles.error}>{errors.password.message}</p>
						) : null}
					</div>

					{serverError ? (
						<p className={styles.serverError} role="alert">
							{serverError}
						</p>
					) : null}

					<Button disabled={isSubmitting} fullWidth type="submit">
						<LogIn aria-hidden="true" />
						{isSubmitting ? "Signing in" : "Sign in"}
					</Button>
				</form>

				<p className={styles.switchText}>
					New to AVELIS? <Link to="/register">Create an account</Link>
				</p>
			</div>
		</section>
	);
}
