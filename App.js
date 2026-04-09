import React, { Component } from 'react';
import { 
  View, Text, StyleSheet, Dimensions, TouchableOpacity, 
  Image, FlatList, TextInput, KeyboardAvoidingView, Platform 
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';

const { width, height } = Dimensions.get('window');

// ==========================================
// 1. MODELS (Định nghĩa đối tượng dữ liệu)
// ==========================================
class CommentModel {
  constructor(id, user, text, likes, time, avatarSource) {
    this.id = id;
    this.user = user;
    this.text = text;
    this.likes = likes;
    this.time = time;
    this.avatarSource = avatarSource; 
  }
}

// Danh sách 7 bình luận tương ứng với 7 file ảnh viết thường
const mockComments = [
  new CommentModel('1', 'martini_rond', 'How neatly I write the date in my book', '8098', '22h', require('./background_1.png')),
  new CommentModel('2', 'maxjacobson', "Now that's a skill very talented", '8098', '22h', require('./background_2.png')),
  new CommentModel('3', 'zackjohn', 'Doing this would make me so anxious', '8098', '22h', require('./background_3.png')),
  new CommentModel('4', 'kiero_d', 'Use that on r air forces to whiten them', '8098', '21h', require('./background_4.png')),
  new CommentModel('5', 'mis_potter', 'Sjpuld’ve used that on his forces 😂', '8098', '13h', require('./background_5.png')),
  new CommentModel('6', 'karennne', 'No prressure', '8098', '22h', require('./background_6.png')),
  new CommentModel('7', 'joshua_l', 'My OCD couldn’t do it', '8098', '15h', require('./background_7.png')),
];

// ==========================================
// 2. COMPONENTS (Các lớp giao diện nhỏ)
// ==========================================

class VideoSidebar extends Component {
  render() {
    const { onCommentPress } = this.props;
    return (
      <View style={styles.sideBar}>
        {/* Avatar chính + Nút Follow */}
        <View style={styles.avatarContainer}>
          <Image source={require('./Ellipse 3.png')} style={styles.userAvatarSide} />
          <TouchableOpacity style={styles.followButton}>
            <Ionicons name="add" size={14} color="white" />
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.sideIcon}>
          <Ionicons name="heart" size={38} color="white" />
          <Text style={styles.iconText}>328.7K</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.sideIcon} onPress={onCommentPress}>
          <Ionicons name="chatbubble-ellipses" size={34} color="white" />
          <Text style={styles.iconText}>7</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.sideIcon}>
          <Ionicons name="arrow-redo" size={34} color="white" />
          <Text style={styles.iconText}>Share</Text>
        </TouchableOpacity>

        <View style={styles.musicDisc}>
          <View style={styles.discInner} />
        </View>
      </View>
    );
  }
}

class CommentItem extends Component {
  render() {
    const { data } = this.props;
    return (
      <View style={styles.commentItem}>
        <Image source={data.avatarSource} style={styles.avatarSmall} />
        <View style={{ flex: 1 }}>
          <Text style={styles.commentUser}>{data.user}</Text>
          <Text style={styles.commentText}>{data.text} <Text style={{color: '#999'}}>{data.time}</Text></Text>
          <Text style={styles.replyText}>View replies (4)</Text>
        </View>
        <View style={{alignItems: 'center'}}>
          <Ionicons name="heart-outline" size={18} color="#999" />
          <Text style={{fontSize: 10, color: '#999'}}>{data.likes}</Text>
        </View>
      </View>
    );
  }
}

// ==========================================
// 3. SCREENS (Các màn hình)
// ==========================================

class VideoScreen extends Component {
  render() {
    const { navigation } = this.props;
    return (
      <View style={styles.fullScreen}>
        <Image source={require('./background.png')} style={styles.backgroundVideo} resizeMode="cover" />
        <View style={styles.overlay}>
          <VideoSidebar onCommentPress={() => navigation.navigate('CommentsModal')} />
          <View style={styles.bottomInfo}>
            <Text style={styles.userHandle}>@craig_love</Text>
            <Text style={styles.description}>The most satisfying job #fyp #satisfying #roadmarking</Text>
            <View style={styles.musicRow}>
               <Ionicons name="musical-notes" size={14} color="white" />
               <Text style={styles.musicText}>Roddy Roundicch - The Rou...</Text>
            </View>
          </View>
        </View>
      </View>
    );
  }
}

class CommentsModal extends Component {
  render() {
    const { navigation } = this.props;
    return (
      <View style={styles.modalOverlay}>
        <TouchableOpacity style={{ flex: 1 }} onPress={() => navigation.goBack()} />
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.commentSheet}>
          <View style={styles.commentHeader}>
            <Text style={{fontWeight: 'bold'}}>7 comments</Text>
            <TouchableOpacity onPress={() => navigation.goBack()}><Ionicons name="close" size={24} color="black" /></TouchableOpacity>
          </View>
          
          <FlatList 
            data={mockComments} 
            renderItem={({item}) => <CommentItem data={item} />} 
            keyExtractor={item => item.id} 
          />
          
          <View style={styles.inputArea}>
            <Image source={require('./background_1.png')} style={styles.inputAvatar} />
            <TextInput placeholder="Add comment..." style={styles.input} />
            <Ionicons name="at-outline" size={24} style={{marginHorizontal: 10}} />
            <Ionicons name="happy-outline" size={24} />
          </View>
        </KeyboardAvoidingView>
      </View>
    );
  }
}

// ==========================================
// 4. NAVIGATION (Điều hướng)
// ==========================================

const TopTab = createMaterialTopTabNavigator();
const BottomTab = createBottomTabNavigator();

function HomeTopTabs({ navigation }) {
  return (
    <TopTab.Navigator screenOptions={{
      tabBarStyle: { backgroundColor: 'transparent', position: 'absolute', top: 40, width: '100%', elevation: 0 },
      tabBarActiveTintColor: 'white',
      tabBarInactiveTintColor: 'rgba(255,255,255,0.6)',
      tabBarLabelStyle: { fontWeight: 'bold', fontSize: 16 },
      tabBarIndicatorStyle: { backgroundColor: 'white', width: 30, marginLeft: width/8 }
    }}>
      <TopTab.Screen name="Following" children={() => <VideoScreen navigation={navigation} />} />
      <TopTab.Screen name="For You" children={() => <VideoScreen navigation={navigation} />} />
    </TopTab.Navigator>
  );
}

export default class App extends Component {
  render() {
    return (
      <SafeAreaProvider>
        <NavigationContainer>
          <BottomTab.Navigator screenOptions={{ 
            headerShown: false, 
            tabBarStyle: { backgroundColor: 'black', height: 80, borderTopWidth: 0 }, 
            tabBarActiveTintColor: 'white',
            tabBarInactiveTintColor: 'gray' 
          }}>
            <BottomTab.Screen name="Home" component={HomeTopTabs} options={{ tabBarIcon: ({color}) => <Ionicons name="home" size={26} color={color} /> }} />
            <BottomTab.Screen name="Discover" component={View} options={{ tabBarIcon: ({color}) => <Ionicons name="search" size={26} color={color} /> }} />
            <BottomTab.Screen name="Add" component={View} options={{ tabBarLabel: '', tabBarIcon: () => <Ionicons name="add-circle" size={45} color="white" /> }} />
            <BottomTab.Screen name="CommentsModal" component={CommentsModal} options={{ tabBarLabel: 'Inbox', tabBarIcon: ({color}) => <Ionicons name="chatbox-ellipses-outline" size={26} color={color} /> }} />
            <BottomTab.Screen name="Me" component={View} options={{ tabBarIcon: ({color}) => <Ionicons name="person-outline" size={26} color={color} /> }} />
          </BottomTab.Navigator>
        </NavigationContainer>
      </SafeAreaProvider>
    );
  }
}

// ==========================================
// STYLES
// ==========================================
const styles = StyleSheet.create({
  fullScreen: { flex: 1, backgroundColor: 'black' },
  backgroundVideo: { ...StyleSheet.absoluteFillObject },
  overlay: { flex: 1, justifyContent: 'flex-end' },
  sideBar: { position: 'absolute', right: 10, bottom: 100, alignItems: 'center' },
  avatarContainer: { marginBottom: 25, alignItems: 'center' },
  userAvatarSide: { width: 50, height: 50, borderRadius: 25, borderWidth: 1, borderColor: 'white' },
  followButton: { position: 'absolute', bottom: -10, backgroundColor: '#fe2c55', width: 20, height: 20, borderRadius: 10, justifyContent: 'center', alignItems: 'center' },
  sideIcon: { marginBottom: 15, alignItems: 'center' },
  iconText: { color: 'white', fontSize: 12, fontWeight: 'bold', marginTop: 4 },
  musicDisc: { width: 45, height: 45, borderRadius: 22.5, backgroundColor: '#333', justifyContent: 'center', alignItems: 'center', borderWidth: 8, borderColor: '#111', marginTop: 10 },
  discInner: { width: 15, height: 15, borderRadius: 7.5, backgroundColor: '#555' },
  bottomInfo: { padding: 15, marginBottom: 10 },
  userHandle: { color: 'white', fontWeight: 'bold', fontSize: 16 },
  description: { color: 'white', marginTop: 5, fontSize: 14, lineHeight: 18 },
  musicRow: { flexDirection: 'row', alignItems: 'center', marginTop: 8 },
  musicText: { color: 'white', marginLeft: 5, fontSize: 13 },
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.4)', justifyContent: 'flex-end' },
  commentSheet: { height: height * 0.75, backgroundColor: 'white', borderTopLeftRadius: 15, borderTopRightRadius: 15 },
  commentHeader: { flexDirection: 'row', justifyContent: 'space-between', padding: 15, borderBottomWidth: 0.5, borderColor: '#eee', alignItems: 'center' },
  commentItem: { flexDirection: 'row', padding: 15 },
  avatarSmall: { width: 35, height: 35, borderRadius: 17.5, marginRight: 12 },
  commentUser: { fontWeight: 'bold', fontSize: 13, color: '#555' },
  commentText: { fontSize: 14, marginTop: 2, color: '#111' },
  replyText: { color: '#999', fontSize: 12, marginTop: 5, fontWeight: '600' },
  inputArea: { flexDirection: 'row', alignItems: 'center', padding: 10, borderTopWidth: 0.5, borderColor: '#eee', paddingBottom: Platform.OS === 'ios' ? 30 : 10 },
  inputAvatar: { width: 30, height: 30, borderRadius: 15, marginRight: 10 },
  input: { flex: 1, backgroundColor: '#f1f1f1', borderRadius: 20, paddingHorizontal: 15, height: 40 }
});