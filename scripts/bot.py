import discord
import asyncio
import socket

client = discord.Client()

@client.event
async def on_ready():
	print('Successful Login: ')
	print(client.user.name)
	print(client.user.id)

@client.event
async def on_message(message):
	if message.content.startswith('!ayy'):
		await client.send_message(message.channel, 'lmao')
	if message.content.startswith('!whereareyou'):
		await client.send_message(message.channel, socket.gethostname())
                
client.run('MzM3Mzc1MjM4NzU5MjUxOTY4.DFGNpQ.7x0S95C-WXMsTN0D8UHAhRU5wtg')
