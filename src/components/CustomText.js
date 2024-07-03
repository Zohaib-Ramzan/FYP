import {Text as ReactNativeText} from 'react-native'
import { responsiveFontSize } from 'react-native-responsive-dimensions'

export default function CustomText({children,style}) {
    return <ReactNativeText style={{fontFamily:'Roboto_400Regular',fontSize:responsiveFontSize(1.9),...style}}>{children}</ReactNativeText>
}