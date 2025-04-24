import React, { useState, ReactNode } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

interface CollapsibleProps {
  title: string; // Define 'title' as a string type
  children: ReactNode; // Define 'children' as ReactNode to allow any valid React elements
}

export default function Collapsible({ title, children }: CollapsibleProps) {
  const [isCollapsed, setIsCollapsed] = useState(true);

  return (
    <View className="mb-4">
      <TouchableOpacity
        onPress={() => setIsCollapsed(!isCollapsed)}
        className="py-2 px-4 bg-blue-600 rounded-lg"
      >
        <Text className="text-white font-medium">{title}</Text>
      </TouchableOpacity>
      {!isCollapsed && <View className="mt-2">{children}</View>}
    </View>
  );
}
