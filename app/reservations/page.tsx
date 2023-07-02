import EmptyState from '@/components/EmptyState';
import ClientOnly from '@/components/ClientOnly';

import getCurrentUser from '@/actions/getCurrentUser';
import getReservations from '@/actions/getReservations';

import TripsClient from './ReservationsClient';

const ReservationsPage = async () => {
	const currentUser = await getCurrentUser();

	if (!currentUser) {
		return (
			<ClientOnly>
				<EmptyState title="Unauthorized" subtitle="Please login" />
			</ClientOnly>
		);
	}

	const reservations = await getReservations(
		undefined,
		undefined,
		currentUser.id
	);

	if (reservations.length === 0) {
		return (
			<ClientOnly>
				<EmptyState
					title="No reservations found"
					subtitle="Looks like you have no reservations on your properties."
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

export default ReservationsPage;
