import React, { useEffect, useState } from 'react'
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native'
import { COLORS, FONTS, SIZES } from '../../constants/theme';
import { useTheme } from '@react-navigation/native';
import { IMAGES } from '../../constants/Images';
import FeatherIcon from 'react-native-vector-icons/Feather';
import { useSelector } from 'react-redux';

type Props = {
    id:string;
    title : string;
    price : any;
    image ?: any;
    delevery : string;
    removelikebtn?: any;
    currency :any;
    offer?:any,
    btntitle?:string,
    review :number,
    brand?:any,
    variants :any,
    discount?:any,
    closebtn?:any,
    trackorder?:any,
    completed?:any,
    EditReview?:any,
    removebottom?:any,
    onPress ?: (e : any) => void,
    onPress2 ?: (e : any) => void,
    onPress3 ?: (e : any) => void,
    onPress4 ?: (e : any) => void,
    onPress5 ?: (id:string,isplus:string) => void,
}


const Cardstyle2 = ({id,title,price,image,review,currency,variants=[],delevery,removelikebtn,offer,btntitle,onPress,brand,discount,closebtn,trackorder,completed,EditReview,onPress2,removebottom,onPress3,onPress4,onPress5}:Props) => {
    const { translations, language } = useSelector((state: any) => state.languageTracker);
    const [itemQuantity, setItemQuantity] = useState(0);
    const theme = useTheme();
    const { colors } : {colors : any} = theme 
    const cart = useSelector((state: any) => state.cart.cart);

  
    useEffect(() => {
        const getData = async () => {
            cart.filter((item: any) => {
                if (String(item._id) === String(id)) {
                    console.log("🚀 ~ cart.filter ~ item:", item)
                    setItemQuantity(item.quantity);
                  }
              });
        };
          getData();
      }, [cart]);

  return (
    <View 
        style={styles.card}
    >
        <TouchableOpacity
            onPress={onPress}
            activeOpacity={0.5}
            style={styles.maincard}
        >
            <View style={[styles.cardimage,{backgroundColor:theme.dark ? 'rgba(255,255,255,0.10)':colors.background,}]}>
                <Image
                    style={{ height: undefined, width:SIZES.width /2.8,aspectRatio:1/1,resizeMode:'contain' }}
                    source={{uri:image}}
                />
            </View>
            <View style={{flex:1,marginLeft:15}}>
                {/* <Text  style={[FONTS.fontMedium,{fontSize:12,color:COLORS.primary,paddingRight:30}]}>{brand}</Text> */}
                <Text style={[FONTS.fontMedium,{fontSize:15,color:colors.title,marginTop:5,paddingRight:10}]}>{title}</Text>
                <View style={[styles.flex,{gap:10,marginTop:2}]}>
                    <Image
                        style={{height:14,width:70}}
                        source={IMAGES.star7}
                    />
                    <Text style={[FONTS.fontMedium,{fontSize:12,color:colors.title,opacity:.5}]}>({review} {translations.review})</Text>
                </View>
                {variants.length>0 ?
                <View style={[styles.flex,{marginTop:2,gap:5}]}>
                <Text style={[FONTS.fontSemiBold,{fontSize:16,color:colors.title}]}>{variants[0].price?.salePrice}{currency}</Text>      
                                {variants[0].price?.comparePrice >variants[0].price.salePrice && (
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
                <Text style={[FONTS.fontRegular,{fontSize:13,color:colors.title,textDecorationLine:'line-through',opacity:.6}]}>{discount}</Text>
                <Text style={[FONTS.fontMedium,{fontSize:12,color:'#CD005D',}]}>{offer}</Text>
            </View>
            :
            <View style={[styles.flex,{marginTop:2,gap:5}]}>
                <Text style={[FONTS.fontSemiBold,{fontSize:16,color:colors.title}]}>{price?.salePrice}{currency}</Text>      
                                {price?.comparePrice >price.salePrice && (
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
                <Text style={[FONTS.fontRegular,{fontSize:13,color:colors.title,textDecorationLine:'line-through',opacity:.6}]}>{discount}</Text>
                <Text style={[FONTS.fontMedium,{fontSize:12,color:'#CD005D',}]}>{offer}</Text>
            </View>}
                {/* <View style={[styles.flex,{gap:5,marginTop:10}]}>
                    <Image
                        style={{height:14,width:14,tintColor:COLORS.success}}
                        source={IMAGES.leftarrow}
                    />
                    <Text style={[styles.subtitle,{color:COLORS.success}]}>14 Days return available</Text>
                </View> */}
            </View>
            {closebtn ?
                <View style={{position:'absolute',right:10,top:5}}>
                    <FeatherIcon size={20} color={colors.title} name={'x'} />
                </View>
            :
            null
            }
        </TouchableOpacity>
        {removebottom ?
            null 
            :
            <View style={styles.cardBottom}>
                {trackorder ? 
                    <TouchableOpacity onPress={onPress2} activeOpacity={0.5} style={[styles.flexcenter,{borderColor:COLORS.inputborder}]}>
                        <FeatherIcon size={14} color={COLORS.primary} name={'truck'} />
                        <Text style={[styles.subtitle,{color:colors.text}]}>Track Order</Text>
                    </TouchableOpacity>
                :completed ? 
                    <View style={[styles.flexcenter,{borderColor:COLORS.success}]}>
                        <Image
                            style={styles.image}
                            source={IMAGES.check4}
                        />
                        <Text style={[styles.subtitle,{color:COLORS.success}]}>Completed</Text>
                    </View>
                :
                     <View
                           style={{
                               flexDirection: 'row',
                               alignItems: 'center',
                               borderWidth:1,
                               height:40,
                               borderRadius:6,
                               borderColor:COLORS.inputborder,
                               overflow:'hidden'
                           }}
                       >
                           <TouchableOpacity
                               onPress={()=>{onPress5(id,'DECREASE');itemQuantity > 1 && setItemQuantity(itemQuantity - 1)}}
                               style={{
                                   height: 40,
                                   width: 36,
                                   alignItems: 'center',
                                   justifyContent: 'center',
                                   borderRightWidth:1,
                                   borderRightColor:COLORS.inputborder,
                                   backgroundColor:theme.dark ? 'rgba(255,255,255,.01)' : '#E4ECF4',
                               }}
                           >
                                <FeatherIcon size={20} color={colors.text} name={'minus'} />
                           </TouchableOpacity>
                           <Text style={{ ...FONTS.fontRegular, fontSize: 14, color: colors.title, width: 45,textAlign:'center' }}>{itemQuantity}</Text>
                           <TouchableOpacity
                               onPress={() =>{ onPress5(id);setItemQuantity(itemQuantity + 1)}} 
                               style={{
                                   height: 40,
                                   width: 36,
                                   alignItems: 'center',
                                   justifyContent: 'center',
                                   borderLeftWidth:1,
                                   borderLeftColor:COLORS.inputborder,
                                   backgroundColor:theme.dark ? 'rgba(255,255,255,.01)' : '#E4ECF4',
                               }}
                           >
                               <FeatherIcon size={20} color={colors.text} name={'plus'} />
                           </TouchableOpacity>
                       </View>
                }

                {trackorder ?
                    <TouchableOpacity onPress={onPress3} activeOpacity={0.5} style={[styles.flexcenter,{borderColor:COLORS.inputborder}]}>
                        <Image
                            style={[styles.image,{tintColor:colors.text}]}
                            source={IMAGES.Star4}
                        />
                        <Text style={[styles.subtitle,{color:colors.text}]}>Write Review</Text>
                    </TouchableOpacity>
                :EditReview ?
                    <TouchableOpacity onPress={onPress3} activeOpacity={0.5} style={[styles.flexcenter,{borderColor:COLORS.primary}]}>
                        <Image
                            style={[styles.image,{tintColor:'#FFAC5F'}]}
                            source={IMAGES.Star4}
                        />
                        <Text style={[styles.subtitle,{color:colors.title}]}>4.5 <Text style={{color:COLORS.primary,textDecorationLine:'underline'}}>Edit Review</Text></Text>
                    </TouchableOpacity>
                :completed ?
                    <TouchableOpacity onPress={onPress3} activeOpacity={0.5} style={[styles.flexcenter,{borderColor:COLORS.inputborder}]}>
                        <Image
                            style={[styles.image,{tintColor:'#FFAC5F' }]}
                            source={IMAGES.Star4}
                        />
                        <Text style={[styles.subtitle,{color:colors.title}]}>Write Review</Text>
                    </TouchableOpacity>
                :<View></View>
                    // <TouchableOpacity
                    //     onPress={onPress5}
                    //     activeOpacity={0.5} style={[styles.flexcenter,{borderColor:COLORS.inputborder}]}>
                    //     <FeatherIcon size={14} color={colors.text} name={'save'} />
                    //     <Text style={[styles.subtitle,{color:colors.text}]}>Save for later</Text>
                    // </TouchableOpacity>
                }      

                <TouchableOpacity
                    onPress={onPress4}
                     activeOpacity={0.5} style={[styles.flexcenter,{backgroundColor:theme.dark ? 'rgba(255,255,255,.01)' : '#FFF4F4',borderColor:COLORS.danger }]}>
                    <Image
                        style={[styles.image,{tintColor:COLORS.danger }]}
                        source={IMAGES.delete}
                    />
                    <Text style={[styles.subtitle,{color:COLORS.danger }]}>Remove</Text>
                </TouchableOpacity>
            </View>
        }
    </View>
  )
}


const styles = StyleSheet.create({
    card:{
        marginTop: 0,
        paddingHorizontal: 15,
        paddingVertical:10,
        paddingBottom:0,
    },
    maincard:{
        flexDirection: 'row',
        gap: 0,
        justifyContent:'center',
        paddingBottom:10,
        marginHorizontal:-5
    },
    cardimage:{
        height: undefined,
        width:SIZES.width / 3,
        aspectRatio:1/1,
         borderRadius: 8,
         alignItems:'center',
         justifyContent:'center'
    },
    flex:{
        flexDirection:'row',
        alignItems:'center',
    },
    cardBottom:{
        height:40,
        width:'100%',
        justifyContent:'space-between',
        flexDirection:'row',
        alignItems:'center',
        marginBottom:10,
        marginTop:5
    },
    flexcenter:{
        flexDirection:'row',
        alignItems:'center',
        gap:5,
        paddingHorizontal:10,
        height:40,
        borderWidth:1,
        borderRadius:6,
    },
    image:{
        height: 16,
        width: 16,
        resizeMode: 'contain',
    },
    subtitle:{
        ...FONTS.fontRegular,
         fontSize: 14,
    }
})

export default Cardstyle2