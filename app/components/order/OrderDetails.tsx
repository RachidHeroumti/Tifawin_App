import React from 'react';
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Image,
} from 'react-native';
import FeatherIcon from 'react-native-vector-icons/Feather';
const OrderDetailsModal = ({visible, onClose, order}) => {
  if (!order) return null;

  return (
    <Modal transparent visible={visible} animationType="slide">
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <FeatherIcon name="x" size={24} color="#333" />
          </TouchableOpacity>
          <ScrollView>
            <Text style={styles.title}>Order Details</Text>

            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                gap: 4,
                padding: 5,
              }}>
              <Text style={styles.label}>Customer Name:</Text>
              <Text style={styles.value}>
                {order.customer?.fullname ||
                  `${order.customer?.firstname} ${order.customer?.lastname}`}
              </Text>
            </View>

            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                gap: 4,
                padding: 5,
              }}>
              <Text style={styles.label}>Email:</Text>
              <Text style={styles.value}>{order.customer?.email}</Text>
            </View>

            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                gap: 4,
                padding: 5,
              }}>
              <Text style={styles.label}>Order ID:</Text>
              <Text style={styles.value}>{order.orderId}</Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                gap: 4,
                padding: 5,
              }}>
              <Text style={styles.label}>Total:</Text>
              <Text style={styles.value}>
                {order.currency} {order.total}
              </Text>
            </View>

            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                gap: 4,
                padding: 5,
              }}>
              <Text style={styles.label}>Status:</Text>
              <Text
                style={[
                  styles.value,
                  {color: order.status === 'PENDING' ? 'orange' : 'green'},
                ]}>
                {order.status}
              </Text>
            </View>

            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                gap: 4,
                padding: 5,
              }}>
              <Text style={styles.label}>Payment Method:</Text>
              <Text style={styles.value}>{order.method?.name}</Text>
            </View>
            <View style={{padding: 5}}>
              <Text style={styles.label}>Details</Text>
              <View
                style={{
                  flexDirection: 'row',
                  paddingVertical: 5,
                  backgroundColor: '#f0f0f0',
                }}>
                <Text style={[styles.label, {flex: 1, textAlign: 'center'}]}>
                  Image
                </Text>
                <Text style={[styles.label, {flex: 2, textAlign: 'center'}]}>
                  Name
                </Text>
                <Text style={[styles.label, {flex: 1, textAlign: 'center'}]}>
                  Price
                </Text>
                <Text style={[styles.label, {flex: 1, textAlign: 'center'}]}>
                  Quantity
                </Text>
              </View>

              {order.details.map((info: any) => (
                <View
                  key={info._id}
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    paddingVertical: 5,
                    borderBottomWidth: 1,
                    borderColor: '#ddd',
                  }}>
                  <View style={{flex: 1, alignItems: 'center'}}>
                    <Image
                      source={{uri: info.product.image?.src || ''}}
                      style={[styles.productImage, {width: 50, height: 50}]}
                    />
                  </View>

                  <Text style={[styles.cell, {flex: 2, textAlign: 'center'}]}>
                    {info.product.name}
                  </Text>

                  <Text style={[styles.cell, {flex: 1, textAlign: 'center'}]}>
                    {info.price}
                  </Text>

                  <Text style={[styles.cell, {flex: 1, textAlign: 'center'}]}>
                    {info.quantity}
                  </Text>
                </View>
              ))}
            </View>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: 'white',
    width: '85%',
    padding: 20,
    borderRadius: 10,
    maxHeight: '80%',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  value: {
    fontSize: 16,
    marginRight: 5,
    marginLeft: 5,
    color: '#333',
  },
  closeButton: {position: 'absolute', top: 10, right: 10, padding: 5},
  closeButtonText: {
    color: 'white',
    fontSize: 16,
  },
  productImage: {
    width: 50,
    height: 50,
    borderRadius: 5,
    marginRight: 10,
  },
  cell: {
    flex: 1,
  },
});

export default OrderDetailsModal;
