'use client';

import { signIn } from 'next-auth/react';
import { AiFillGithub } from 'react-icons/ai';
// import { signIn } from 'next-auth/react';
import { FcGoogle } from 'react-icons/fc';
import { useCallback, useState } from 'react';
import { toast } from 'react-hot-toast';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';

import useLoginModal from '@/hooks/useLoginModal';
// import useRegisterModal from '@/hooks/useRegisterModal';

import Modal from './Modal';
import Input from '../inputs/Input';
import Heading from '../Heading';
import Button from '../Button';
import { useRouter } from 'next/navigation';
import useRegisterModal from '@/hooks/useRegisterModal';

const LoginModal = () => {
	const registerStore = useRegisterModal();
	const loginStore = useLoginModal();
	const [isLoading, setIsLoading] = useState(false);
	const router = useRouter();

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<FieldValues>({
		defaultValues: {
			email: '',
			password: '',
		},
	});

	const onSubmit: SubmitHandler<FieldValues> = (data) => {
		setIsLoading(true);

		signIn('credentials', {
			...data,
			redirect: false,
		}).then((result) => {
			setIsLoading(false);

			if (result?.error) {
				toast.error('Something went wrong! ' + result?.error, {
					position: 'bottom-right',
				});
			} else if (result?.ok) {
				toast.success('Logged in successfully!', {
					position: 'bottom-right',
				});
				router.refresh();
				loginStore.onClose();
			}
		});
	};

	const onToggle = useCallback(() => {
		registerStore.onOpen();
		loginStore.onClose();
	}, [registerStore, loginStore]);

	const bodyContent = (
		<div className="flex flex-col gap-4">
			<Heading title="Welcome back" subtitle="Login to your account!" />
			<Input
				id="email"
				label="Email"
				disabled={isLoading}
				register={register}
				errors={errors}
				required
			/>
			<Input
				id="password"
				label="Password"
				type="password"
				disabled={isLoading}
				register={register}
				errors={errors}
				required
			/>
		</div>
	);

	const footerContent = (
		<div className="flex flex-col gap-4 mt-3">
			<hr />
			<Button
				outline
				label="Continue with Google"
				icon={FcGoogle}
				onClick={() => {
					signIn('google');
				}}
				className="hover:bg-slate-100"
			/>
			<Button
				outline
				label="Continue with Github"
				icon={AiFillGithub}
				onClick={() => {
					signIn('github');
				}}
				className="hover:bg-slate-100"
			/>
			<div
				className="
	          text-neutral-500
	          text-center
	          mt-4
	          font-light
	        "
			>
				<p>
					First time using Airbnb?
					<span
						onClick={onToggle}
						className="
	              text-neutral-800
	              cursor-pointer
	              hover:underline
	            "
					>
						{' '}
						Create an account
					</span>
				</p>
			</div>
		</div>
	);

	return (
		<Modal
			disabled={isLoading}
			isOpen={loginStore.isOpen}
			title="Login"
			actionLabel="Continue"
			onClose={loginStore.onClose}
			onSubmit={handleSubmit(onSubmit)}
			body={bodyContent}
			footer={footerContent}
		/>
	);
};

export default LoginModal;
