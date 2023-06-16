'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

const Logo = () => {
	const router = useRouter();
	return (
		<Image
			src="/images/airbnb-logo.png"
			alt="Airbnb logo"
			width={100}
			height={100}
			className="cursor-pointer hidden md:block"
			onClick={() => router.push('/')}
		/>
	);
};

export default Logo;
