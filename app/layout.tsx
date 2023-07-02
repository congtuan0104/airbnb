import './globals.css';
import { Nunito } from 'next/font/google';
import Navbar from '@/components/navbar/Navbar';
import ClientOnly from '@/components/ClientOnly';
import ToasterProvider from '@/providers/ToasterProvider';
import getCurrentUser from '@/actions/getCurrentUser';
import RegisterModal from '@/components/modals/RegisterModal';
import LoginModal from '@/components/modals/LoginModal';
import RentModal from '@/components/modals/RentModal';
import SearchModal from '@/components/modals/SearchModal';

const nunito = Nunito({ subsets: ['latin'] });

export const metadata = {
	title: 'Vacation homes and condo rentals - Airbnb',
	description: 'Airbnb Clone',
};

export default async function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const currentUser = await getCurrentUser();
	return (
		<html lang="en">
			<body className={nunito.className}>
				<ClientOnly>
					<ToasterProvider />
					<RegisterModal />
					<LoginModal />
					<RentModal />
					<SearchModal />
					<Navbar currentUser={currentUser} />
				</ClientOnly>
				<main className="pt-28 pb-20">{children}</main>
			</body>
		</html>
	);
}
