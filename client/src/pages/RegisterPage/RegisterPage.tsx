import styles from "./RegisterPage.module.scss";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff, UserPlus } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { z } from "zod";

import { useRegister } from "../../features/auth/hooks/useAuth";
import { ApiClientError } from "../../services/apiClient";
import { Button } from "../../components/ui/Button/Button";
import { IconButton } from "../../components/ui/IconButton/IconButton";
import { Input } from "../../components/ui/Input/Input";

const registerSchema = z
	.object({
		firstName: z.string().trim().min(1, "Enter your first name.").max(80),
		lastName: z.string().trim().min(1, "Enter your last name.").max(80),
		email: z.string().trim().email("Enter a valid email address."),
		password: z.string().min(8, "Password must be at least 8 characters."),
		confirmPassword: z.string().min(8, "Confirm your password."),
	})
	.refine((values) => values.password === values.confirmPassword, {
		message: "Passwords do not match.",
		path: ["confirmPassword"],
	});

type RegisterFormValues = z.infer<typeof registerSchema>;

const GENERIC_REGISTER_ERROR = "Unable to create your account. Please try again.";

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

function getRegisterErrorMessage(error: unknown) {
	if (error instanceof ApiClientError) {
		return error.message === "The API request failed."
			? GENERIC_REGISTER_ERROR
			: error.message;
	}

	return GENERIC_REGISTER_ERROR;
}

export function RegisterPage() {
	const location = useLocation();
	const navigate = useNavigate();
	const registerMutation = useRegister();
	const [serverError, setServerError] = useState<string | null>(null);
	const [showPassword, setShowPassword] = useState(false);
	const {
		formState: { errors },
		handleSubmit,
		register,
	} = useForm<RegisterFormValues>({
		resolver: zodResolver(registerSchema),
		defaultValues: {
			firstName: "",
			lastName: "",
			email: "",
			password: "",
			confirmPassword: "",
		},
	});
	const isSubmitting = registerMutation.isPending;

	const onSubmit = async ({
		confirmPassword: _confirmPassword,
		...values
	}: RegisterFormValues) => {
		setServerError(null);

		try {
			await registerMutation.mutateAsync(values);
			navigate(getSafeRedirect(location.state), { replace: true });
		} catch (error) {
			setServerError(getRegisterErrorMessage(error));
		}
	};

	return (
		<section className={styles.page}>
			<div className={styles.panel}>
				<div className={styles.heading}>
					<p>Begin your collection</p>
					<h1>Create your AVELIS account</h1>
				</div>

				<form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
					<div className={styles.nameGrid}>
						<div className={styles.field}>
							<label htmlFor="firstName">First name</label>
							<Input
								autoComplete="given-name"
								id="firstName"
								{...register("firstName")}
							/>
							{errors.firstName ? (
								<p className={styles.error}>{errors.firstName.message}</p>
							) : null}
						</div>

						<div className={styles.field}>
							<label htmlFor="lastName">Last name</label>
							<Input
								autoComplete="family-name"
								id="lastName"
								{...register("lastName")}
							/>
							{errors.lastName ? (
								<p className={styles.error}>{errors.lastName.message}</p>
							) : null}
						</div>
					</div>

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
								autoComplete="new-password"
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

					<div className={styles.field}>
						<label htmlFor="confirmPassword">Confirm password</label>
						<Input
							autoComplete="new-password"
							id="confirmPassword"
							type={showPassword ? "text" : "password"}
							{...register("confirmPassword")}
						/>
						{errors.confirmPassword ? (
							<p className={styles.error}>
								{errors.confirmPassword.message}
							</p>
						) : null}
					</div>

					{serverError ? (
						<p className={styles.serverError} role="alert">
							{serverError}
						</p>
					) : null}

					<Button disabled={isSubmitting} fullWidth type="submit">
						<UserPlus aria-hidden="true" />
						{isSubmitting ? "Creating account" : "Create account"}
					</Button>
				</form>

				<p className={styles.switchText}>
					Already have an account? <Link to="/login">Sign in</Link>
				</p>
			</div>
		</section>
	);
}
