import getCurrentUser from '@/actions/getCurrentUser';
import getListingById from '@/actions/getListingById';
import ClientOnly from '@/components/ClientOnly';
import EmptyState from '@/components/EmptyState';
import ListingClient from './ListingClient';
import getReservations from '@/actions/getReservations';

interface IParams {
	listingId: string;
}

const ListingPage = async ({ params }: { params: IParams }) => {
	const { listingId } = params;
	const listing = await getListingById(listingId);
	const currentUser = await getCurrentUser();
	const reservations = await getReservations(listingId);

	if (!listing) {
		return (
			<ClientOnly>
				<EmptyState showReset />
			</ClientOnly>
		);
	}

	return (
		<ListingClient
			listing={listing}
			currentUser={currentUser}
			reservations={reservations}
		/>
	);
};

export default ListingPage;
