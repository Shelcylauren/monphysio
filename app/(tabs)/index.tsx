import React from 'react'; 
import { SafeAreaView} from 'react-native'; 
import HomeHeader from '@/components/HomeHeader';
import SearchBar from '@/components/SearchBar';
import Recommendation from '@/components/Recommendation';
import Article from '@/components/Article';

export default function Index() {    
  
  return (     
    <SafeAreaView className="flex-1 px-4 bg-white"> 
      <HomeHeader />
      <SearchBar />
      <Recommendation />
      <Article />
    </SafeAreaView>   
  ); 
}
