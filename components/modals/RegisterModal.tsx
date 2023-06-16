'use client';

import axios from 'axios';
import { AiFillGithub } from 'react-icons/ai';
// import { signIn } from 'next-auth/react';
import { FcGoogle } from 'react-icons/fc';
import { useCallback, useState } from 'react';
import { toast } from 'react-hot-toast';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';

// import useLoginModal from "@/hooks/useLoginModal";
import useRegisterModal from '@/hooks/useRegisterModal';

import Modal from './Modal';
import Input from '../inputs/Input';
import Heading from '../Heading';
import Button from '../Button';
import { signIn } from 'next-auth/react';
import useLoginModal from '@/hooks/useLoginModal';

const RegisterModal = () => {
	const registerStore = useRegisterModal();
	const loginStore = useLoginModal();
	const [isLoading, setIsLoading] = useState(false);

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<FieldValues>({
		defaultValues: {
			name: '',
			email: '',
			password: '',
		},
	});

	const onSubmit: SubmitHandler<FieldValues> = (data) => {
		setIsLoading(true);

		axios
			.post('/api/register', data)
			.then(() => {
				toast.success('Registered!');
				registerStore.onClose();
				//   loginModal.onOpen();
			})
			.catch((error) => {
				toast.error(error);
			})
			.finally(() => {
				setIsLoading(false);
			});
	};

	const onToggle = useCallback(() => {
		registerStore.onClose();
		loginStore.onOpen();
	}, [registerStore, loginStore]);

	const bodyContent = (
		<div className="flex flex-col gap-4">
			<Heading title="Welcome to Airbnb" subtitle="Create an account!" />
			<Input
				id="email"
				label="Email"
				disabled={isLoading}
				register={register}
				errors={errors}
				required
			/>
			<Input
				id="name"
				label="Name"
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
					Already have an account?
					<span
						onClick={onToggle}
						className="
	              text-neutral-800
	              cursor-pointer
	              hover:underline
	            "
					>
						{' '}
						Log in
					</span>
				</p>
			</div>
		</div>
	);

	return (
		<Modal
			disabled={isLoading}
			isOpen={registerStore.isOpen}
			title="Register"
			actionLabel="Continue"
			onClose={registerStore.onClose}
			onSubmit={handleSubmit(onSubmit)}
			body={bodyContent}
			footer={footerContent}
		/>
	);
};

export default RegisterModal;
