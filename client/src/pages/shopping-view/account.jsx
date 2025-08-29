import accountIMg from '../../assets/account.jpg'
import { Tabs,TabsContent,TabsList,TabsTrigger } from '@/components/ui/tabs'
import ShoppingOrders from '@/components/shopping-view/orders'
import Address from '@/components/shopping-view/address'
function ShoppingAccount(){
   return (
     <div className="flex flex-col">
       <div className="relative h-[300px] w-full overflow-hidden">
        <img src={accountIMg} alt="Account" className="object-cover w-full h-full object-center" />
       </div>

       <div  className='container mx-auto grid grid-cols-1 gap-8 py-8'>
        <div className='flex flex-col rounded-lg border bg-background p-6'>   
<Tabs defaultValue="orders">
<TabsList>
  <TabsTrigger value="orders">Orders</TabsTrigger>
  <TabsTrigger value="address">Addresses</TabsTrigger>
</TabsList>
<TabsContent value="orders">
<ShoppingOrders></ShoppingOrders>
</TabsContent>
<TabsContent value="address">
<Address></Address>
</TabsContent>

</Tabs>

                </div>
       </div>
     </div>
   )
}
export default ShoppingAccount
