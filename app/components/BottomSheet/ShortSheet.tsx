import {View, Text, TouchableOpacity, Image, StyleSheet} from 'react-native';
import React, {useState} from 'react';
import {useTheme} from '@react-navigation/native';
import {GlobalStyleSheet} from '../../constants/StyleSheet';
import {COLORS, FONTS} from '../../constants/theme';
import {IMAGES} from '../../constants/Images';
import { useDispatch } from 'react-redux';
import { setSortOption } from '../../redux/reducer/sortTrack';
import { SortForm } from '../../core/tools';

type Props = {
  shortRef?: any;
};

const ShortSheet2 = ({shortRef}: Props) => {
  const dispatch = useDispatch();


//;
  const theme = useTheme();
  const {colors}: {colors: any} = theme;

  const SortData = [
    {name: 'Name (A-Z)', type: 'name', q: 1},
    {name: 'Name (Z-A)', type: 'name', q: -1},
    {name: 'Price -- Low to High', type: 'price.salePrice', q: 1},
    {name: 'Price -- High to Low', type: 'price.salePrice', q: -1},
    {name: 'Newest', type: 'createdAt', q: -1},
    {name: 'Oldest', type: 'createdAt', q: 1},
    {name: 'Rating -- High to Low', type: 'review.rating', q: -1},
    {name: 'Rating -- Low to High', type: 'review.rating', q: 1},
  ];

  const [activeSize, setActiveSize] = useState(SortData[0]);

  const handleSort =(data :SortForm) => {
    if(data)
      dispatch(setSortOption(data)) ;
  }


  return (
    <View
      style={[
        GlobalStyleSheet.container,
        {
          paddingTop: 0,
          backgroundColor: theme.dark ? colors.background : colors.card,
        },
      ]}>
      <View
        style={[
          styles.filterBackground,
          {
            borderBottomColor: colors.border,
          },
        ]}>
        <Text style={[FONTS.fontMedium, {color: colors.title, fontSize: 16}]}>
          SORT BY
        </Text>
        <TouchableOpacity
          style={[styles.Closebackgrond, {backgroundColor: colors.card}]}
          onPress={() => shortRef.current.close()}>
          <Image
            style={{
              width: 18,
              height: 18,
              resizeMode: 'contain',
              tintColor: colors.title,
            }}
            source={IMAGES.close}
          />
        </TouchableOpacity>
      </View>
      <View
        style={{
          flexDirection: 'row',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
          marginTop: 20,
        }}>
        {SortData.map((data:SortForm, index) => {
          return (
            <TouchableOpacity
              onPress={() => { setActiveSize(data);handleSort(data)}}
              key={index}
              style={[
                {
                  height: 40,
                  width: '48%', // Makes two items per row
                  alignItems: 'center',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  paddingVertical: 5,
                  marginBottom: 5,
                },
              ]}>
              <Text
                style={[
                  {...FONTS.fontRegular, fontSize: 15, color: colors.title},
                ]}>
                {data.name}
              </Text>
              <View
                style={[
                  {
                    backgroundColor: theme.dark
                      ? 'rgba(255,255,255,.2)'
                      : colors.background,
                    width: 24,
                    height: 24,
                    borderRadius: 50,
                    alignItems: 'center',
                    justifyContent: 'center',
                  },
                  activeSize === data && {
                    backgroundColor: COLORS.primary,
                  },
                ]}>
                <View
                  style={[
                    {
                      width: 14,
                      height: 14,
                      backgroundColor: theme.dark
                        ? 'rgba(255,255,255,0)'
                        : colors.card,
                      borderRadius: 50,
                    },
                    activeSize === data && {
                      backgroundColor: colors.card,
                    },
                  ]}></View>
              </View>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  filterBackground: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: COLORS.background,
    paddingBottom: 10,
    paddingTop: 10,
    marginHorizontal: -15,
    paddingHorizontal: 15,
  },
  Closebackgrond: {
    height: 38,
    width: 38,
    backgroundColor: COLORS.card,
    borderRadius: 38,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default ShortSheet2;
