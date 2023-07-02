import getCurrentUser from '@/actions/getCurrentUser';
import getReservations from '@/actions/getReservations';
import ClientOnly from '@/components/ClientOnly';
import EmptyState from '@/components/EmptyState';
import TripsClient from './TripsClient';

const TripsPage = async () => {
	const currentUser = await getCurrentUser();

	if (!currentUser) {
		return (
			<ClientOnly>
				<EmptyState title="Unauthorized" subtitle="Please login your account" />
			</ClientOnly>
		);
	}

	const reservations = await getReservations(undefined, currentUser.id);
	if (reservations.length === 0) {
		return (
			<ClientOnly>
				<EmptyState
					title="No trips found"
					subtitle="Look like you have'nt reserved any trips."
				/>
			</ClientOnly>
		);
	}

	return (
		<ClientOnly>
			<TripsClient reservations={reservations} currentUser={currentUser} />
		</ClientOnly>
	);
};

export default TripsPage;
