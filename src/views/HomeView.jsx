import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  useWindowDimensions,
  SafeAreaView,
  StatusBar,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function HomeView({ onLogout }) {
  const { width } = useWindowDimensions();
  const isWideScreen = width > 768;

  // Mock data for the dashboard
  const [selectedSector, setSelectedSector] = useState('Todos');
  const [recentIncidents, setRecentIncidents] = useState([
    { id: 1, title: 'Fuga de Riego - Sector C', type: 'Infraestructura', priority: 'Alta', status: 'En Progreso', time: 'Hace 2 horas' },
    { id: 2, title: 'Fallo de Transmisión - Tractor JD #4', type: 'Maquinaria', priority: 'Alta', status: 'Pendiente', time: 'Hace 5 horas' },
    { id: 3, title: 'Calibración de Aspersores', type: 'Mantenimiento', priority: 'Baja', status: 'Completado', time: 'Ayer' },
    { id: 4, title: 'Detección de Plaga - Invernadero #2', type: 'Cultivo', priority: 'Media', status: 'En Progreso', time: 'Ayer' },
  ]);

  const sectors = ['Todos', 'Rancho Norte', 'Valle Este', 'Sector C (Sur)'];

  // Custom Sidebar component for Desktop/Web
  const Sidebar = () => (
    <View style={styles.sidebar}>
      <View style={styles.sidebarBrand}>
        <View style={styles.smallLogoBox}>
          <Text style={styles.smallLogoText}>A</Text>
        </View>
        <Text style={styles.sidebarBrandText}>ATLAS</Text>
      </View>

      <View style={styles.sidebarMenu}>
        <TouchableOpacity style={[styles.sidebarMenuItem, styles.sidebarMenuItemActive]} activeOpacity={0.7}>
          <Ionicons name="grid-outline" size={20} color="#d9ab55" style={styles.menuIcon} />
          <Text style={styles.menuTextActive}>Dashboard</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.sidebarMenuItem} activeOpacity={0.7}>
          <Ionicons name="folder-open-outline" size={20} color="#8e929a" style={styles.menuIcon} />
          <Text style={styles.menuText}>Expedientes</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.sidebarMenuItem} activeOpacity={0.7}>
          <Ionicons name="construct-outline" size={20} color="#8e929a" style={styles.menuIcon} />
          <Text style={styles.menuText}>Equipos</Text>
          <View style={styles.badge}><Text style={styles.badgeText}>92%</Text></View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.sidebarMenuItem} activeOpacity={0.7}>
          <Ionicons name="alert-circle-outline" size={20} color="#8e929a" style={styles.menuIcon} />
          <Text style={styles.menuText}>Incidencias</Text>
          <View style={styles.alertBadge}><Text style={styles.alertBadgeText}>14</Text></View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.sidebarMenuItem} activeOpacity={0.7}>
          <Ionicons name="settings-outline" size={20} color="#8e929a" style={styles.menuIcon} />
          <Text style={styles.menuText}>Ajustes</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.sidebarFooter}>
        <TouchableOpacity style={styles.logoutButton} onPress={onLogout} activeOpacity={0.7}>
          <Ionicons name="log-out-outline" size={20} color="#ff6b6b" style={styles.menuIcon} />
          <Text style={styles.logoutText}>Cerrar Sesión</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      <View style={styles.layoutWrapper}>
        {/* Render Sidebar on Wide Screens */}
        {isWideScreen && <Sidebar />}

        {/* Main Content Area */}
        <View style={styles.mainContent}>
          {/* Top Navbar */}
          <View style={styles.navbar}>
            {/* Header info */}
            <View>
              <Text style={styles.navbarGreeting}>Hola, Administrador</Text>
              <Text style={styles.navbarSubtitle}>Viernes, 22 de Mayo de 2026</Text>
            </View>

            {/* Icons row / Logout for mobile */}
            <View style={styles.navbarActions}>
              <TouchableOpacity style={styles.iconActionButton} activeOpacity={0.7}>
                <Ionicons name="notifications-outline" size={22} color="#ffffff" />
                <View style={styles.notificationDot} />
              </TouchableOpacity>
              
              {!isWideScreen && (
                <TouchableOpacity style={styles.logoutIconButton} onPress={onLogout} activeOpacity={0.7}>
                  <Ionicons name="log-out-outline" size={22} color="#ff6b6b" />
                </TouchableOpacity>
              )}
            </View>
          </View>

          {/* Scrollable Dashboard Elements */}
          <ScrollView
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
          >
            {/* Weather & Agricultural Status Banner */}
            <View style={styles.weatherBanner}>
              <View style={styles.weatherInfo}>
                <Ionicons name="sunny" size={32} color="#d9ab55" />
                <View style={{ marginLeft: 16 }}>
                  <Text style={styles.weatherTemp}>28°C • Parcialmente Nublado</Text>
                  <Text style={styles.weatherDetails}>Prob. Lluvia: 10% | Humedad: 62% | Viento: 12 km/h</Text>
                </View>
              </View>
              <View style={styles.irrigationStatus}>
                <View style={styles.statusDotActive} />
                <Text style={styles.irrigationText}>Riego Activo en Sector B</Text>
              </View>
            </View>

            {/* Filter sectors */}
            <View style={styles.filtersSection}>
              <Text style={styles.sectionTitle}>Sectores Agrícolas</Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.sectorChipsRow}>
                {sectors.map((sec) => (
                  <TouchableOpacity
                    key={sec}
                    style={[styles.sectorChip, selectedSector === sec && styles.sectorChipActive]}
                    onPress={() => setSelectedSector(sec)}
                    activeOpacity={0.7}
                  >
                    <Text style={[styles.sectorChipText, selectedSector === sec && styles.sectorChipTextActive]}>
                      {sec}
                    </Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>

            {/* Stats Grid */}
            <View style={styles.statsGrid}>
              <View style={[styles.statsCard, { borderLeftColor: '#d9ab55' }]}>
                <View style={styles.statsCardHeader}>
                  <Ionicons name="leaf-outline" size={20} color="#d9ab55" />
                  <Text style={styles.statsCardTitle}>Terrenos</Text>
                </View>
                <Text style={styles.statsCardVal}>1,240 Ha</Text>
                <Text style={styles.statsCardSub}>12 sectores activos</Text>
              </View>

              <View style={[styles.statsCard, { borderLeftColor: '#4cd964' }]}>
                <View style={styles.statsCardHeader}>
                  <Ionicons name="construct-outline" size={20} color="#4cd964" />
                  <Text style={styles.statsCardTitle}>Equipos</Text>
                </View>
                <Text style={styles.statsCardVal}>92%</Text>
                <Text style={styles.statsCardSub}>22 operativos / 2 maint.</Text>
              </View>

              <View style={[styles.statsCard, { borderLeftColor: '#ff9500' }]}>
                <View style={styles.statsCardHeader}>
                  <Ionicons name="alert-circle-outline" size={20} color="#ff9500" />
                  <Text style={styles.statsCardTitle}>Incidencias</Text>
                </View>
                <Text style={styles.statsCardVal}>14 Activas</Text>
                <Text style={styles.statsCardSub}>3 alta prioridad</Text>
              </View>
            </View>

            {/* Dashboard Content split (Quick Actions and Recent Tickets) */}
            <View style={[styles.contentSplit, isWideScreen ? styles.rowDirection : styles.columnDirection]}>
              
              {/* Left Column: Recent Incidents */}
              <View style={[styles.contentColumn, { flex: 3, marginRight: isWideScreen ? 20 : 0 }]}>
                <View style={styles.columnHeader}>
                  <Text style={styles.sectionTitle}>Últimas Incidencias</Text>
                  <TouchableOpacity activeOpacity={0.7}>
                    <Text style={styles.sectionLink}>Ver Todas</Text>
                  </TouchableOpacity>
                </View>

                {recentIncidents.map((incident) => (
                  <View key={incident.id} style={styles.incidentRow}>
                    <View style={styles.incidentRowHeader}>
                      <View style={styles.incidentMain}>
                        <View style={[
                          styles.priorityDot, 
                          incident.priority === 'Alta' ? { backgroundColor: '#ff3b30' } :
                          incident.priority === 'Media' ? { backgroundColor: '#ff9500' } : { backgroundColor: '#4cd964' }
                        ]} />
                        <Text style={styles.incidentTitle}>{incident.title}</Text>
                      </View>
                      <Text style={styles.incidentTime}>{incident.time}</Text>
                    </View>
                    
                    <View style={styles.incidentDetailsRow}>
                      <Text style={styles.incidentType}>{incident.type}</Text>
                      <View style={[
                        styles.statusBadge,
                        incident.status === 'Completado' ? styles.statusBadgeCompleted :
                        incident.status === 'En Progreso' ? styles.statusBadgeProgress : styles.statusBadgePending
                      ]}>
                        <Text style={[
                          styles.statusBadgeText,
                          incident.status === 'Completado' ? { color: '#4cd964' } :
                          incident.status === 'En Progreso' ? { color: '#5ac8fa' } : { color: '#ff9500' }
                        ]}>
                          {incident.status}
                        </Text>
                      </View>
                    </View>
                  </View>
                ))}
              </View>

              {/* Right Column: Quick Actions & Operations */}
              <View style={[styles.contentColumn, { flex: 2, marginTop: isWideScreen ? 0 : 24 }]}>
                <Text style={styles.sectionTitle}>Operaciones Rápidas</Text>
                
                <View style={styles.actionsGrid}>
                  <TouchableOpacity style={styles.actionCard} activeOpacity={0.8}>
                    <View style={[styles.actionIconCircle, { backgroundColor: 'rgba(217, 171, 85, 0.15)' }]}>
                      <Ionicons name="add-circle" size={24} color="#d9ab55" />
                    </View>
                    <Text style={styles.actionCardTitle}>Nueva Incidencia</Text>
                  </TouchableOpacity>

                  <TouchableOpacity style={styles.actionCard} activeOpacity={0.8}>
                    <View style={[styles.actionIconCircle, { backgroundColor: 'rgba(76, 217, 100, 0.15)' }]}>
                      <Ionicons name="construct" size={24} color="#4cd964" />
                    </View>
                    <Text style={styles.actionCardTitle}>Reporte de Equipos</Text>
                  </TouchableOpacity>

                  <TouchableOpacity style={styles.actionCard} activeOpacity={0.8}>
                    <View style={[styles.actionIconCircle, { backgroundColor: 'rgba(90, 200, 250, 0.15)' }]}>
                      <Ionicons name="folder-open" size={24} color="#5ac8fa" />
                    </View>
                    <Text style={styles.actionCardTitle}>Expediente Terrenos</Text>
                  </TouchableOpacity>

                  <TouchableOpacity style={styles.actionCard} activeOpacity={0.8}>
                    <View style={[styles.actionIconCircle, { backgroundColor: 'rgba(255, 149, 0, 0.15)' }]}>
                      <Ionicons name="pulse" size={24} color="#ff9500" />
                    </View>
                    <Text style={styles.actionCardTitle}>Sensores y Clima</Text>
                  </TouchableOpacity>
                </View>
              </View>

            </View>
          </ScrollView>

          {/* Bottom Navigation for Mobile (Only visible when stacked) */}
          {!isWideScreen && (
            <View style={styles.mobileTabBar}>
              <TouchableOpacity style={styles.tabItemActive}>
                <Ionicons name="grid" size={20} color="#d9ab55" />
                <Text style={styles.tabTextActive}>Home</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.tabItem}>
                <Ionicons name="folder-open-outline" size={20} color="#8e929a" />
                <Text style={styles.tabText}>Sectores</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.tabItem}>
                <Ionicons name="construct-outline" size={20} color="#8e929a" />
                <Text style={styles.tabText}>Equipos</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.tabItem}>
                <Ionicons name="alert-circle-outline" size={20} color="#8e929a" />
                <Text style={styles.tabText}>Alertas</Text>
              </TouchableOpacity>
            </View>
          )}

        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111214',
  },
  layoutWrapper: {
    flex: 1,
    flexDirection: 'row',
  },
  rowDirection: {
    flexDirection: 'row',
  },
  columnDirection: {
    flexDirection: 'column',
  },
  // Sidebar (Desktop Mode)
  sidebar: {
    width: 260,
    backgroundColor: '#16171a',
    borderRightWidth: 1,
    borderRightColor: '#202227',
    paddingVertical: 24,
    paddingHorizontal: 16,
    justifyContent: 'space-between',
  },
  sidebarBrand: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    marginBottom: 40,
  },
  smallLogoBox: {
    backgroundColor: '#d9ab55',
    width: 28,
    height: 28,
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
    transform: [{ rotate: '-4deg' }],
  },
  smallLogoText: {
    color: '#111214',
    fontWeight: 'bold',
    fontSize: 16,
  },
  sidebarBrandText: {
    color: '#ffffff',
    fontSize: 20,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  sidebarMenu: {
    flex: 1,
  },
  sidebarMenuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderRadius: 8,
    marginBottom: 8,
  },
  sidebarMenuItemActive: {
    backgroundColor: 'rgba(217, 171, 85, 0.1)',
  },
  menuIcon: {
    marginRight: 12,
    width: 20,
  },
  menuText: {
    color: '#8e929a',
    fontSize: 15,
    fontWeight: '500',
  },
  menuTextActive: {
    color: '#d9ab55',
    fontSize: 15,
    fontWeight: '600',
  },
  badge: {
    marginLeft: 'auto',
    backgroundColor: 'rgba(76, 217, 100, 0.15)',
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
  badgeText: {
    color: '#4cd964',
    fontSize: 11,
    fontWeight: 'bold',
  },
  alertBadge: {
    marginLeft: 'auto',
    backgroundColor: 'rgba(255, 59, 48, 0.15)',
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
  alertBadgeText: {
    color: '#ff3b30',
    fontSize: 11,
    fontWeight: 'bold',
  },
  sidebarFooter: {
    borderTopWidth: 1,
    borderTopColor: '#202227',
    paddingTop: 16,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  logoutText: {
    color: '#ff6b6b',
    fontSize: 15,
    fontWeight: '500',
  },
  // Main Content Space
  mainContent: {
    flex: 1,
    backgroundColor: '#111214',
    flexDirection: 'column',
  },
  navbar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingVertical: 18,
    borderBottomWidth: 1,
    borderBottomColor: '#1d1f24',
    backgroundColor: '#16171a',
  },
  navbarGreeting: {
    color: '#ffffff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  navbarSubtitle: {
    color: '#8e929a',
    fontSize: 13,
    marginTop: 2,
  },
  navbarActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconActionButton: {
    width: 40,
    height: 40,
    borderRadius: 8,
    backgroundColor: '#1f2025',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  notificationDot: {
    position: 'absolute',
    top: 10,
    right: 11,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#ff3b30',
  },
  logoutIconButton: {
    width: 40,
    height: 40,
    borderRadius: 8,
    backgroundColor: 'rgba(255, 107, 107, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 12,
  },
  // Scrollable Dashboard Elements
  scrollContent: {
    padding: 24,
    paddingBottom: 80, // Allow space for bottom tab bar on mobile
  },
  weatherBanner: {
    backgroundColor: '#16171a',
    borderWidth: 1,
    borderColor: '#202227',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    marginBottom: 24,
  },
  weatherInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  weatherTemp: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  weatherDetails: {
    color: '#8e929a',
    fontSize: 12,
    marginTop: 4,
  },
  irrigationStatus: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(90, 200, 250, 0.1)',
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginTop: 10,
  },
  statusDotActive: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#5ac8fa',
    marginRight: 6,
  },
  irrigationText: {
    color: '#5ac8fa',
    fontSize: 12,
    fontWeight: '600',
  },
  // Sectors Filter Chips
  filtersSection: {
    marginBottom: 24,
  },
  sectionTitle: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 14,
  },
  sectorChipsRow: {
    paddingVertical: 2,
  },
  sectorChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#1e2025',
    marginRight: 10,
    borderWidth: 1,
    borderColor: '#26282e',
  },
  sectorChipActive: {
    backgroundColor: '#d9ab55',
    borderColor: '#d9ab55',
  },
  sectorChipText: {
    color: '#8e929a',
    fontSize: 14,
    fontWeight: '500',
  },
  sectorChipTextActive: {
    color: '#111214',
    fontWeight: 'bold',
  },
  // Stats Grid
  statsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
    flexWrap: 'wrap',
  },
  statsCard: {
    flex: 1,
    minWidth: 150,
    backgroundColor: '#16171a',
    borderWidth: 1,
    borderColor: '#202227',
    borderLeftWidth: 4,
    borderRadius: 12,
    padding: 16,
    marginRight: 8,
    marginBottom: 8,
  },
  statsCardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  statsCardTitle: {
    color: '#8e929a',
    fontSize: 12,
    fontWeight: '600',
    marginLeft: 8,
  },
  statsCardVal: {
    color: '#ffffff',
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  statsCardSub: {
    color: '#5a5e66',
    fontSize: 11,
  },
  // Content Split layout
  contentSplit: {
    flex: 1,
  },
  contentColumn: {
    backgroundColor: '#16171a',
    borderWidth: 1,
    borderColor: '#202227',
    borderRadius: 12,
    padding: 20,
    marginBottom: 16,
  },
  columnHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 14,
  },
  sectionLink: {
    color: '#d9ab55',
    fontSize: 13,
    fontWeight: '600',
  },
  incidentRow: {
    backgroundColor: '#1b1d22',
    borderWidth: 1,
    borderColor: '#26282e',
    borderRadius: 8,
    padding: 14,
    marginBottom: 12,
  },
  incidentRowHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  incidentMain: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  priorityDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginRight: 10,
  },
  incidentTitle: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: 'bold',
    flex: 1,
  },
  incidentTime: {
    color: '#5a5e66',
    fontSize: 11,
    marginLeft: 10,
  },
  incidentDetailsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  incidentType: {
    color: '#8e929a',
    fontSize: 12,
  },
  statusBadge: {
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
  statusBadgeCompleted: {
    backgroundColor: 'rgba(76, 217, 100, 0.12)',
  },
  statusBadgeProgress: {
    backgroundColor: 'rgba(90, 200, 250, 0.12)',
  },
  statusBadgePending: {
    backgroundColor: 'rgba(255, 149, 0, 0.12)',
  },
  statusBadgeText: {
    fontSize: 11,
    fontWeight: 'bold',
  },
  // Actions Grid
  actionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  actionCard: {
    width: '48%',
    backgroundColor: '#1b1d22',
    borderColor: '#26282e',
    borderWidth: 1,
    borderRadius: 10,
    padding: 16,
    alignItems: 'center',
    marginBottom: 12,
  },
  actionIconCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  actionCardTitle: {
    color: '#ffffff',
    fontSize: 13,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  // Mobile Bottom Tab Bar
  mobileTabBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 60,
    backgroundColor: '#16171a',
    borderTopWidth: 1,
    borderTopColor: '#202227',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingBottom: Platform.OS === 'ios' ? 12 : 0,
  },
  tabItem: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  tabItemActive: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  tabText: {
    color: '#8e929a',
    fontSize: 10,
    marginTop: 2,
    fontWeight: '500',
  },
  tabTextActive: {
    color: '#d9ab55',
    fontSize: 10,
    marginTop: 2,
    fontWeight: 'bold',
  },
});
