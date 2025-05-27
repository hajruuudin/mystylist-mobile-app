import { Modal, View, Text, TouchableOpacity, FlatList } from 'react-native';

type CategoryPickerProps = {
  categories: string[];
  selected: string | null;
  onSelect: (category: string) => void;
  visible: boolean;
  onClose: () => void;
};

export function ItemCategoryPicker({ categories, selected, onSelect, visible, onClose } : CategoryPickerProps) {
  return (
    <Modal transparent visible={visible} animationType="slide">
      <View className="flex-1 justify-end bg-white bg-opacity-50">
        <View className="bg-white p-4 rounded-t-lg max-h-50">
          <Text className="text-xl font-bold mb-4">Select Category</Text>
          <FlatList
            data={categories}
            keyExtractor={(item) => item}
            renderItem={({ item }) => (
              <TouchableOpacity
                className={`py-3 ${item === selected ? 'bg-blue-100' : ''}`}
                onPress={() => {
                  onSelect(item);
                  onClose();
                }}
              >
                <Text className="text-lg">{item}</Text>
              </TouchableOpacity>
            )}
          />
          <TouchableOpacity
            className="mt-4 p-3 bg-gray-200 rounded"
            onPress={onClose}
          >
            <Text className="text-center text-gray-700">Cancel</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}
