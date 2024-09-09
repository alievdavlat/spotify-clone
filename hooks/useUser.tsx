import { Subscription, UserDetails } from "@/types";
import { createServerComponentClient, User } from "@supabase/auth-helpers-nextjs";
import { useSessionContext, useUser as useSupaUser } from "@supabase/auth-helpers-react";
import React, { createContext } from "react";

type UserContextType = {
  accessToken: string | null;
  user: User | null | undefined;
  userDetails: UserDetails | null;
  isLoading: boolean;
  subscription: Subscription | null;
};

export const UserContext = createContext<UserContextType | undefined>(undefined);

export interface Props {
  [propName: string]: any;
}

export const UserProvider =  (props: Props) => {
  const { session, isLoading: isLoadingUser, supabaseClient } = useSessionContext();

  if (!supabaseClient) {
    console.error('SupabaseClient is not initialized');
    return null;
  }
  
  const userdata= useSupaUser();

 

  
  
  const accessToken = session?.access_token ?? null;
  const [isLoadingData, setIsLoadingData] = React.useState(false);
  const [userDetails, setUserDetails] = React.useState<UserDetails | null>(null);
  const [subscription, setSubscription] = React.useState<Subscription | null>(null);
  const [user, setUser] = React.useState<User | null | undefined>(null);
  const getUser = async() => {
    const {data:sessionData, error:sessionError} = await supabaseClient.auth.getSession()
    if (sessionData?.session?.user) { 
      setUser(sessionData?.session?.user)
    } else {
      setUser(userdata)
    }
    
  }

  getUser()


  const getUserDetails = () => supabaseClient.from('users').select('*').single();
  const getSubscription = () => supabaseClient
    .from('subscriptions')
    .select('*, prices(*, products(*))')
    .in('status', ['trialing', 'active'])
    .single();

  React.useEffect(() => {
    if (user && !isLoadingData && !userDetails && !subscription) {
      setIsLoadingData(true);

      Promise.allSettled([getUserDetails(), getSubscription()]).then((res) => {
        const userDetailPromise = res[0];
        const subscriptionPromise = res[1];

        if (userDetailPromise.status === 'fulfilled') {
          setUserDetails(userDetailPromise.value.data as UserDetails);
        }

        if (subscriptionPromise.status === 'fulfilled') {
          setSubscription(subscriptionPromise.value.data as Subscription);
        }
      }).finally(() => {
        setIsLoadingData(false);
      });
    } else if (!user && !userDetails && !isLoadingData) {
      setUserDetails(null);
      setSubscription(null);
    }
  }, [user, isLoadingData, userDetails, subscription]);

  const value: UserContextType = {
    accessToken,
    user,
    userDetails,
    isLoading: isLoadingData || isLoadingUser,
    subscription,
  };

  return <UserContext.Provider value={value}>{props.children}</UserContext.Provider>;
};

export const useUser = () => {
  const context = React.useContext(UserContext);

    if (context === undefined) {
      throw new Error('useUser must be used within a UserProvider');
    }

  return context;
};
