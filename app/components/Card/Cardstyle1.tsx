import React, {useState} from 'react';
import {View, Text, Image, TouchableOpacity, StyleSheet} from 'react-native';
import {COLORS, FONTS} from '../../constants/theme';
import {useNavigation, useTheme} from '@react-navigation/native';
import LikeBtn from '../LikeBtn';
import {IMAGES} from '../../constants/Images';
import {useDispatch, useSelector} from 'react-redux';
import {removeFromwishList} from '../../redux/reducer/wishListReducer';
import {IProduct} from '../../core/tools';

type Props = {
  id: string;
  title: string;
  color: any;
  price: any;
  currency: string;
  image: any;
  offer: string;
  hascolor?: any;
  review: number;
  brand?: any;
  discount?: any;
  wishlist?: any;
  variants: any;
  background?: any;
  borderTop?: any;
  onPress?: (e: any) => void;
  onPress2?: (e: any) => void;
  onPress3?: (e: any) => void;
  onPress4?: (e: any) => void;
  onPress5?: (e: any) => void;
};

const Cardstyle1 = ({
  id,
  title,
  price,
  currency = 'XOF',
  image,
  offer,
  hascolor,
  review,
  variants = [],
  onPress,
  discount,
  wishlist,
  onPress2,
  background,
  onPress3,
  onPress4,
  onPress5,
}: Props) => {
  const {translations, language} = useSelector(
    (state: any) => state.languageTracker,
  );
  const src = image?.toString();
  const theme = useTheme();
  const {colors}: {colors: any} = theme;
  const navagation = useNavigation();
  const dispatch = useDispatch();
  const wishList = useSelector((state: any) => state.wishList.wishList);

  const inWishlist = () => {
    var temp = [] as any;
    wishList.forEach((data: any) => {
      temp.push(data.id);
    });
    return temp;
  };

  const removeItemFromWishList = () => {
    dispatch(removeFromwishList(id as any));
  };

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      style={{
        backgroundColor: background
          ? colors.background
          : theme.dark
          ? colors.background
          : colors.card,
        width: '100%',
        height: undefined,
        //aspectRatio:hascolor ? wishlist ? 1/1.85 : 1/1.3 : 1/1.6,
        paddingBottom: 20,
        paddingHorizontal: 0,
      }}
      onPress={onPress}>
      <View style={[styles.cardimage]}>
        <Image
          style={{
            height: undefined,
            width: '100%',
            aspectRatio: 1 / 0.7,
            resizeMode: 'contain',
          }}
          source={{uri: src}}
        />
      </View>
      <TouchableOpacity style={{position: 'absolute', right: 0, top: -5}}>
        {wishlist ? (
          <TouchableOpacity
            onPress={onPress3}
            style={{marginTop: 15, marginRight: 15}}>
            <Image
              style={{height: 18, width: 18, tintColor: COLORS.danger}}
              source={IMAGES.delete}
            />
          </TouchableOpacity>
        ) : (
          <LikeBtn
            id={id}
            onPress={
              inWishlist().includes(id) ? removeItemFromWishList : onPress3
            }
            inWishlist={inWishlist}
          />
        )}
      </TouchableOpacity>
      {/* <TouchableOpacity  style={{position:'absolute',right:0,top:10}}>
            {wishlist ?
                <TouchableOpacity 
                    onPress={onPress3}
                    style={{marginTop:25,marginRight:15}}>
                    <Image
                        style={{height:18,width:18,tintColor:COLORS.danger}}
                        source={IMAGES.delete}
                    />
                </TouchableOpacity> 
            :
                <LikeBtn
                    id={id}
                    onPress={inWishlist().includes(id) ? removeItemFromWishList : onPress3}
                    inWishlist={inWishlist}
                />
            }
        </TouchableOpacity> */}

      <View
        style={{
          paddingHorizontal: hascolor ? 0 : 0,
          marginTop: hascolor ? 0 : 5,
        }}>
        <Text style={[styles.cardTitle, {color: colors.title}]}>{title}</Text>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            gap: 5,
            marginTop: 2,
          }}>
          <Image style={{height: 14, width: 70}} source={IMAGES.star7} />
          <Text
            style={[styles.cardsubTitle, {color: colors.title, opacity: 0.5}]}>
            ({review} {translations.review})
          </Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            width: 100,
            paddingTop: 5,
          }}>
          <View style={{flexDirection: 'column', width: 100}}>
            {variants.length > 0 ? (
              <View
                style={{
                  flexDirection: 'column',
                  marginTop: 2,
                  gap: 5,
                }}>
                <Text style={[styles.cardprice, {color: colors.title}]}>
                  {variants[0].price.salePrice}
                  {currency}
                </Text>
                {variants[0].price?.comparePrice >
                  variants[0].price.salePrice && (
                  <Text
                    style={[
                      FONTS.fontMedium,
                      {
                        color: colors.title,
                        textDecorationLine: 'line-through',
                        opacity: 0.6,
                      },
                    ]}>
                    {variants[0].price.comparePrice} {currency}
                  </Text>
                )}
                <Text style={[styles.cardUnderlineText, {color: colors.title}]}>
                  {discount}
                </Text>
                <Text style={[styles.cardsubTitle, {color: '#CD005D'}]}>
                  {offer}
                </Text>
              </View>
            ) : (
              <View
                style={{
                  flexDirection: 'column',
                  marginTop: 2,
                  gap: 5,
                }}>
                <Text style={[styles.cardprice, {color: colors.title}]}>
                  {price.salePrice}
                  {currency}
                </Text>
                {price?.comparePrice > price.salePrice && (
                  <Text
                    style={[
                      FONTS.fontMedium,
                      {
                        
                        color: colors.title,
                        textDecorationLine: 'line-through',
                        opacity: 0.6,
                      },
                    ]}>
                    {price.comparePrice} {currency}
                  </Text>
                )}

               {discount&& <Text style={[styles.cardUnderlineText, {color: colors.title}]}>
                  {discount}
                </Text>}
               {offer&& <Text style={[styles.cardsubTitle, {color: '#CD005D'}]}>
                  {offer}
                </Text>}
              </View>
            )}
          </View>
          <View
            style={{
              width: 100,
              paddingTop: 5,
              alignItems: 'center',
            }}>
            {!wishlist && (
              <TouchableOpacity
                onPress={onPress5}
                style={{
                  backgroundColor: '#FFB800',
                  borderRadius: 50,
                  padding: 5,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Image
                  style={{height: 25, width: 25, tintColor: COLORS.text}}
                  source={IMAGES.addtocarticon}
                />
              </TouchableOpacity>
            )}
          </View>
        </View>
      </View>
      {wishlist ? (
        <View
          style={{
            paddingHorizontal: 0,
            marginTop: 10,
            backgroundColor: '#FFB800',
          }}>
          <TouchableOpacity
            //onPress={() => setshow(!show)}
            onPress={onPress4}
            activeOpacity={0.5}
            style={styles.cardbtn}>
            <Text style={[styles.cardsubTitle, {fontSize: 14}]}>
              {translations.add_to_cart}
            </Text>
          </TouchableOpacity>
        </View>
      ) : (
        <TouchableOpacity
          style={{position: 'absolute', right: 0, top: 10}}></TouchableOpacity>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  cardimage: {
    height: undefined,
    width: '100%',
    aspectRatio: 1 / 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 6,
  },
  cardTitle: {
    ...FONTS.fontMedium,
    fontSize: 14,
    color: COLORS.title,
    marginTop: 5,
    paddingRight: 10,
  },
  cardsubTitle: {
    ...FONTS.fontMedium,
    fontSize: 12,
    color: COLORS.title,
  },
  cardUnderlineText: {
    ...FONTS.fontRegular,
    fontSize: 13,
    color: COLORS.title,
    textDecorationLine: 'line-through',
    opacity: 0.6,
  },
  cardprice: {
    ...FONTS.fontSemiBold,
    fontSize: 16,
    color: COLORS.title,
  },
  cardbtn: {
    height: 40,
    width: '100%',
    borderWidth: 2,
    borderColor: COLORS.secondary,
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.secondary,
  },
});

export default Cardstyle1;
