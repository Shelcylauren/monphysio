import React from 'react'; 
import { SafeAreaView} from 'react-native'; 
import HomeHeader from '@/Components/HomeHeader';
import SearchBar from '@/Components/SearchBar';
import Recommendation from '@/Components/Recommendation';
import Article from '@/Components/Article';

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
