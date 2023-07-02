'use client';
import { AiOutlineMenu } from 'react-icons/ai';
import Avatar from '../Avatar';
import { useCallback, useState } from 'react';
import MenuItem from './MenuItem';
import useRegisterModal from '@/hooks/useRegisterModal';
import useLoginModal from '@/hooks/useLoginModal';
import { signOut } from 'next-auth/react';
import { SafeUser } from '@/types';
import useRentModal from '@/hooks/useRentModal';
import { useRouter } from 'next/navigation';

interface IUserMenuProps {
	currentUser?: SafeUser | null;
}

const UserMenu: React.FC<IUserMenuProps> = ({ currentUser }) => {
	const [isOpen, setIsOpen] = useState(false);
	const router = useRouter();
	const registerStore = useRegisterModal();
	const loginStore = useLoginModal();
	const rentStore = useRentModal();

	const toggleOpen = useCallback(() => {
		setIsOpen((prev) => !prev);
	}, []);

	const onRent = useCallback(() => {
		if (!currentUser) return loginStore.onOpen();
		rentStore.onOpen();
	}, [currentUser, loginStore, rentStore]);

	return (
		<div className="relative">
			<div className="flex flex-row items-center gap-3">
				<div
					onClick={onRent}
					className="hidden md:block text-sm font-semibold py-3 px-4 rounded-full
                 hover:bg-neutral-100 transition cursor-pointer"
				>
					Airbnb your home
				</div>

				<div
					className="p-4 md:py-1 md:px-2 border-[1px] border-neutral-200 flex flex-row 
                items-center gap-3 rounded-full cursor-pointer hover:shadow-sm transition"
					onClick={toggleOpen}
				>
					<AiOutlineMenu />
					<div className="hidden md:block">
						<Avatar src={currentUser?.image} />
					</div>
				</div>
			</div>
			{isOpen && (
				<div
					className="absolute rounded-xl shadow-md w-[40vw] md:w-3/4 bg-white overflow-hidden
                 right-0 top-12 text-sm"
				>
					<div className="flex flex-col cursor-pointer">
						{currentUser ? (
							<>
								<MenuItem
									label="My properties"
									onClick={() => router.push('/properties')}
								/>
								<MenuItem
									label="My favorites"
									onClick={() => router.push('/favorites')}
								/>
								<MenuItem
									label="My trips"
									onClick={() => router.push('/trips')}
								/>
								<MenuItem
									label="My reservations"
									onClick={() => router.push('/reservations')}
								/>
								<MenuItem label="Airbnb your home" onClick={rentStore.onOpen} />
								<MenuItem label="Help" />
								<hr />
								<MenuItem label="Logout" onClick={signOut} />
							</>
						) : (
							<>
								<MenuItem label="Sign up" onClick={registerStore.onOpen} />
								<MenuItem label="Login" onClick={loginStore.onOpen} />
								<MenuItem label="Airbnb your home" onClick={onRent} />
								<MenuItem label="Help" />
							</>
						)}
					</div>
				</div>
			)}
		</div>
	);
};

export default UserMenu;
