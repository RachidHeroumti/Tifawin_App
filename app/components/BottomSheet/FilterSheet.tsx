import React, {useEffect, useState, useCallback, useMemo} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  StyleSheet,
  Platform,
} from 'react-native';
import {useNavigation, useTheme} from '@react-navigation/native';
import {useDispatch} from 'react-redux';
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import {GlobalStyleSheet} from '../../constants/StyleSheet';
import {COLORS, FONTS} from '../../constants/theme';
import {IMAGES} from '../../constants/Images';
import Button from '../Button/Button';
import ButtonOutline from '../Button/ButtonOutline';
import {get} from '../../core/http';
import {setFilterOption} from '../../redux/reducer/filterTracker';
import type {FilterFormat} from '../../core/tools';

interface FilterSheetProps {
  sheetRef: React.RefObject<any>;
}

interface Brand {
  name: string;
  imageSrc: string;
}
interface PriceFormat {
  max: number;
  min: number;
}



const FilterSheet2: React.FC<FilterSheetProps> = ({sheetRef}) => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const {colors} = theme;
  const [existColors, setExistColors] = useState([]);
  const [existTags, setExistTags] = useState([]);
  const[sizes,setSizes] =useState([]) ;

  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedColors, setSelectedColors] = useState<Color[]>([]);
  const [selectedSizes, setSelectedSizes] = useState<Size[]>([]);
  const [selectedpriceRange, setSelectedPriceRange] =useState<PriceFormat>();
  const [brands, setBrands] = useState<Brand[]>([]);

  useEffect(() => {
    const fetchBrands = async () => {
      try {
        const response = await get('brands/search');
        setBrands(response.data.results);
      } catch (error) {
        console.error('Failed to fetch brands:', error);
      }
    };
    fetchBrands();
  }, []);

  useEffect(() => {
    const getFilters = async () => {
      const res = await get('/products/filters');
      setExistColors(res.data.colors);
      setExistTags(res.data.tags);
      setSelectedPriceRange(res.data.prices);
      setSizes(res.data.sizes) 
      
      console.log("🚀 ~ getFilters ~ res.data.price:", res.data)
    };
    getFilters();
  }, []);

  const handleValuesChange = useCallback(
    (value: string | string[], type: 'brands' | 'colors' | 'sizes') => {
      const values = Array.isArray(value) ? value : [value];

      const updateState = {
        brands: setSelectedBrands,
        colors: setSelectedColors,
        sizes: setSelectedSizes,
      }[type];

      updateState((prev: string[]) => {
        const newSelection = [...prev];
        values.forEach(val => {
          const index = newSelection.indexOf(val);
          if (index === -1) {
            newSelection.push(val);
          } else {
            newSelection.splice(index, 1);
          }
        });
        return newSelection;
      });
    },
    [],
  );

  const handlePriceChange = useCallback((values: number[]) => {
    console.log("🚀 ~ handlePriceChange ~ values:", values);
    
    const prs: PriceFormat = {
      min:0, 
      max: values[0], 
    };

    setSelectedPriceRange(prs);
  }, [setSelectedPriceRange]);
  const handleReset = useCallback(() => {
    setSelectedBrands([]);
    setSelectedColors([]);
    setSelectedSizes([]);
    //setSelectedPriceRange({0,0});
  }, []);

  const handleApply = useCallback(() => {
    const filterData: FilterFormat = {
      brands: selectedBrands,
      colors: selectedColors,
      sizes: selectedSizes,
      priceRange: selectedpriceRange,
    };
    console.log('🚀 ~ handleApply ~ filterData:', filterData);
    dispatch(setFilterOption(filterData));
    sheetRef.current?.close();
  }, [
    selectedBrands,
    selectedColors,
    selectedSizes,
    selectedpriceRange,
    dispatch,
    sheetRef,
  ]);

  // Memoized components
  const renderHeader = useMemo(
    () => (
      <View
        style={[styles.filterHeader, {borderBottomColor: colors.background}]}>
        <Text style={[styles.headerTitle, {color: colors.title}]}>Filters</Text>
        <TouchableOpacity
          style={[styles.closeButton, {backgroundColor: colors.card}]}
          onPress={() => sheetRef.current?.close()}>
          <Image
            style={[styles.closeIcon, {tintColor: colors.title}]}
            source={IMAGES.close}
          />
        </TouchableOpacity>
      </View>
    ),
    [colors, sheetRef],
  );

  const renderFilterSection = useCallback(
    ({title, children}: {title: string; children: React.ReactNode}) => (
      <View>
        <View style={styles.sectionHeader}>
          <Text style={[styles.sectionTitle, {color: colors.title}]}>
            {title}
          </Text>
        </View>
        {children}
      </View>
    ),
    [colors?.title, sheetRef],
  );

  return (
    <View
      style={[
        styles.container,
        {backgroundColor: theme.dark ? colors.background : colors.card},
      ]}>
      {renderHeader}

      <ScrollView>
        {renderFilterSection({
          title: 'Brand',
          children: (
            <View style={styles.optionsGrid}>
              {brands.map((brand: any) => (
                <TouchableOpacity
                  key={brand.name}
                  onPress={() => handleValuesChange(brand.slug, 'brands')}
                  style={[
                    styles.brandButton,
                    selectedBrands.includes(brand.slug) && styles.selectedBrand,
                  ]}>
                  <Image
                    style={styles.brandImage}
                    source={{uri: brand.imageSrc}}
                  />
                </TouchableOpacity>
              ))}
            </View>
          ),
        })}

        {renderFilterSection({
          title: 'Colors',
          children: (
            <View style={styles.optionsGrid}>
            {existColors?.map((color, index) => (
              <TouchableOpacity
                key={index} // Use a unique key
                onPress={() => handleValuesChange(color, 'colors')}
                style={[
                  styles.optionButton,
                  {
                    backgroundColor: theme.dark ? 'rgba(255,255,255,0.10)' : '#FAFDFF',
                  },
                  selectedColors.includes(color) && styles.selectedOption,
                ]}>
                <Text
                  style={[
                    styles.optionText,
                    { color: colors.title },
                    selectedColors.includes(color) && styles.selectedOptionText,
                  ]}>
                  {color.value1}
                </Text>
              </TouchableOpacity>
            ))}
          </View>          
          ),
        })}

        {renderFilterSection({
          title: 'Size',
          children: (
            <View style={styles.optionsGrid}>
            {sizes?.map((size :any, i :number) => (
              <TouchableOpacity
                key={i}
                onPress={() => handleValuesChange(size, 'sizes')}
                style={[
                  styles.optionButton,
                  {
                    backgroundColor: theme.dark ? 'rgba(255,255,255,0.10)' : '#FAFDFF',
                  },
                  selectedSizes.includes(size) && styles.selectedOption,
                ]}>
                <Text
                  style={[
                    styles.optionText,
                    { color: colors.title },
                    selectedSizes.includes(size) && styles.selectedOptionText,
                  ]}>
                  {size.value1}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
          
          ),
        })}

        {renderFilterSection({
          title: 'Price',
          children: (
            <View style={styles.priceSection}>
            <View style={styles.priceLabels}>
              <Text style={[styles.priceLabel, { color: colors.title }]}>
                ${selectedpriceRange?.min}
              </Text>
              <Text style={[styles.priceLabel, { color: colors.title }]}>
                ${selectedpriceRange?.max}
              </Text>
            </View>
            <MultiSlider
              values={selectedpriceRange}
              sliderLength={320}
              onValuesChange={handlePriceChange}
              min={selectedpriceRange?.min}
              max={selectedpriceRange?.max}
              selectedStyle={{ backgroundColor: colors.title }}
              markerStyle={styles.sliderMarker}
              containerStyle={styles.sliderContainer}
              allowOverlap={false}
              minMarkerOverlapDistance={10}
            />
          </View>
          ),
        })}

        <View style={styles.buttonContainer}>
          <View style={styles.buttonWrapper}>
            <ButtonOutline
              title="Reset"
              color={COLORS.inputborder}
              text={colors.title}
              onPress={handleReset}
            />
          </View>
          <View style={styles.buttonWrapper}>
            <Button
              title="Apply"
              text={COLORS.title}
              color={COLORS.primary}
              onPress={handleApply}
            />
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...GlobalStyleSheet.container,
    paddingTop: 0,
  },
  filterHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    paddingVertical: 10,
    marginHorizontal: -15,
    paddingHorizontal: 15,
  },
  headerTitle: {
    ...FONTS.fontMedium,
    fontSize: 16,
  },
  closeButton: {
    height: 38,
    width: 38,
    borderRadius: 38,
    alignItems: 'center',
    justifyContent: 'center',
  },
  closeIcon: {
    width: 18,
    height: 18,
    resizeMode: 'contain',
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
  },
  sectionTitle: {
    ...FONTS.fontMedium,
    fontSize: 15,
  },
  seeAllText: {
    ...FONTS.fontRegular,
    fontSize: 13,
    color: COLORS.primary,
  },
  optionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 5,
    marginTop: 10,
  },
  brandButton: {
    height: 45,
    width: 45,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: COLORS.inputborder,
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectedBrand: {
    borderColor: COLORS.primary,
  },
  brandImage: {
    height: 30,
    width: 30,
    resizeMode: 'contain',
    borderRadius: 30,
  },
  optionButton: {
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: COLORS.inputborder,
    paddingHorizontal: 20,
    paddingVertical: 5,
    marginBottom: 5,
  },
  selectedOption: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  optionText: {
    ...FONTS.fontMedium,
    fontSize: 13,
  },
  selectedOptionText: {
    color: COLORS.white,
  },
  priceSection: {
    marginTop: 5,
  },
  priceLabels: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    marginBottom: 10,
  },
  priceLabel: {
    ...FONTS.fontMedium,
    fontSize: 12,
    borderWidth: 1,
    borderColor: COLORS.inputborder,
    textAlign: 'center',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 8,
  },
  sliderContainer: {
    alignSelf: 'center',
    marginTop: -10,
  },
  sliderMarker: {
    height: 24,
    width: 24,
    borderRadius: 50,
    backgroundColor: COLORS.white,
    borderWidth: 2,
    borderColor: COLORS.title,
    ...Platform.select({
      android: {
        elevation: 3,
      },
      ios: {
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.25,
        shadowRadius: 3,
      },
    }),
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 10,
    paddingRight: 10,
    marginTop: 15,
    marginBottom: 50,
  },
  buttonWrapper: {
    width: '50%',
  },
});

export default FilterSheet2;
