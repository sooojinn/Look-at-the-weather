import { AddressItem } from '@/config/types';
import AddressListEmpty from './AddressListEmpty';
import AddressListItem from './AddressListItem';

export default function AddressList({ addressList, isPostForm }: { addressList: AddressItem[]; isPostForm: boolean }) {
  return (
    <div className="-mx-5 overflow-y-auto scrollbar-hide">
      {addressList.length ? (
        addressList.map((addressDetails) => (
          <AddressListItem key={addressDetails.address_name} isPostForm={!!isPostForm} {...addressDetails} />
        ))
      ) : (
        <AddressListEmpty />
      )}
    </div>
  );
}
