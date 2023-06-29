<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'
import { SkyWayContext, SkyWayRoom, SkyWayStreamFactory } from '@skyway-sdk/room'
import cognito from '@/utils/cognito'

const idToken = await cognito.getIdToken()
const { audio, video } = await SkyWayStreamFactory.createMicrophoneAudioAndCameraStream()

const roomName = ref('')
const myId = ref('')

const fetchToken = () => {
  return axios
    .get(import.meta.env.VITE_FETCH_TOKEN_URL, {
      headers: { Authorization: idToken }
    })
    .then((response) => response.data.token)
}

const join = async () => {
  if (roomName.value === '') return

  const token = await fetchToken()
  const context = await SkyWayContext.Create(token)
  const room = await SkyWayRoom.FindOrCreate(context, {
    type: 'p2p',
    name: roomName.value
  })
  const me = await room.join()

  myId.value = me.id

  await me.publish(audio)
  await me.publish(video)

  const subscribeAndAttach = (publication) => {
    if (publication.publisher.id === me.id) return

    const buttonArea = document.getElementById('button-area')
    const subscribeButton = document.createElement('button')
    subscribeButton.textContent = `${publication.publisher.id}: ${publication.contentType}`
    buttonArea.appendChild(subscribeButton)

    subscribeButton.onclick = async () => {
      const { stream } = await me.subscribe(publication.id)

      let newMedia
      switch (stream.track.kind) {
        case 'video':
          newMedia = document.createElement('video')
          newMedia.playsInline = true
          newMedia.autoplay = true
          break
        case 'audio':
          newMedia = document.createElement('audio')
          newMedia.controls = true
          newMedia.autoplay = true
          break
        default:
          return
      }
      stream.attach(newMedia)
      const remoteMediaArea = document.getElementById('remote-media-area')
      remoteMediaArea.appendChild(newMedia)
    }
  }
  room.publications.forEach(subscribeAndAttach)
  room.onStreamPublished.add((e) => subscribeAndAttach(e.publication))
}

const router = useRouter()
const logout = () => {
  cognito.logout()
  router.push('/')
}

onMounted(async () => {
  const localVideo = document.getElementById('local-video')
  video.attach(localVideo)
  await localVideo.play()
})
</script>

<template>
  <p>ID: {{ myId }}</p>
  <div>
    room name: <input id="room-name" type="text" v-model="roomName" />
    <button id="join" @click="join()">join</button>
  </div>
  <video id="local-video" muted playsinline style="width: 400px"></video>
  <div id="button-area"></div>
  <div id="remote-media-area"></div>
  <button @click="logout()">Logout</button>
</template>
